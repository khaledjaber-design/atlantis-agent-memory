# Setup

Two things to stand up: a **TiDB Cloud Starter** cluster (free, self-service) and your own **mem9** server pointed at it.

Budget an afternoon the first time. Write down what you hit — the rough edges are useful material for your write-up.

---

## 1. Create your TiDB Cloud Starter cluster

1. Sign up at **https://tidbcloud.com** and create a **Starter** cluster. It is free and provisions in a few minutes. Pick a region close to you.
2. From the cluster's **Connect** panel, copy the host, port (`4000`), username and password.
3. Create a database for mem9 to use:

   ```sql
   CREATE DATABASE mnemos;
   ```

**Keep the free tier in mind.** There are storage and request quotas. Nothing in this project needs volume — keep your synthetic datasets small and design around the limit rather than against it.

**Never commit the connection string.** Put it in `.env`, which is already gitignored.

---

## 2. Run your own mem9 server

The mem9 server is Apache-2.0 licensed and self-hostable, and **TiDB is its default storage backend**.

```bash
git clone https://github.com/mem9-ai/mem9
cd mem9
make build
```

Load the TiDB schema into your cluster before the first start — the schema file is `server/schema.sql` in that repository.

Then run the server:

```bash
cd server
MNEMO_DB_BACKEND=tidb \
MNEMO_DSN="user:pass@tcp(host:4000)/mnemos?parseTime=true" \
./bin/mnemo-server
```

It listens on port `8080` by default (`MNEMO_PORT` to change it).

There is a Docker path too, if you prefer it:

```bash
make docker REGISTRY=local COMMIT=dev
docker run -e MNEMO_DSN="..." -e MNEMO_DB_BACKEND="tidb" -p 8080:8080 local/mnemo-server:dev
```

**Likely first gotcha:** TiDB Cloud requires TLS on connections. If the server cannot connect, check that first. The commands above are a starting point — the mem9 repository README is the authoritative source for current flags.

---

## 3. Connect an agent

mem9 exposes an HTTP API and ships plugins for several agent front ends. Point your agent at your running server and confirm you can write a memory and read it back before building anything else.

**Sanity check before you go further:** write something, stop the server, start it again, read it back. If that works, your foundation is sound and everything after it is your own logic.

---

## 4. Build the "without memory" version too

Don't leave this until the end. Your demo is a comparison, and the version *without* memory is half of it. Build both from the start so the contrast is honest — same task, same prompts, same data, one variable different.
