// Run from a checkout of mem9/server: go run /path/to/this/file.
// This creates a local-demo space using MNEMO_DSN and prints its API key.
package main

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"errors"
	"fmt"
	"net"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
)

func main() {
	if err := run(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func run() error {
	dsn := os.Getenv("MNEMO_DSN")
	if dsn == "" {
		return errors.New("set MNEMO_DSN before running bootstrap")
	}
	cfg, err := mysql.ParseDSN(dsn)
	if err != nil {
		return err
	}
	host, port, err := net.SplitHostPort(cfg.Addr)
	if err != nil {
		return err
	}
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return err
	}
	defer db.Close()
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()
	if err := db.PingContext(ctx); err != nil {
		return err
	}
	const name = "Nova Memory Demo"
	var id string
	err = db.QueryRowContext(ctx, "SELECT id FROM tenants WHERE name = ? AND status != 'deleted'", name).Scan(&id)
	if err == nil {
		fmt.Println(id)
		return nil
	}
	if !errors.Is(err, sql.ErrNoRows) {
		return err
	}
	random := make([]byte, 16)
	if _, err := rand.Read(random); err != nil {
		return err
	}
	id = hex.EncodeToString(random)
	_, err = db.ExecContext(ctx, `INSERT INTO tenants
		(id, name, db_host, db_port, db_user, db_password, db_name, db_tls, provider, status, schema_version)
		VALUES (?, ?, ?, ?, ?, ?, ?, 1, 'manual', 'active', 1)`,
		id, name, host, port, cfg.User, cfg.Passwd, cfg.DBName)
	if err != nil {
		return err
	}
	fmt.Println(id)
	return nil
}
