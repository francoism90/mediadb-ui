# MediaDB Front-end

**MediaDB** is a web-based video streaming service written in Laravel and Vue ([Quasar](https://quasar.dev/)).

- Manage library using tags and collections.
- User roles and permissions.
- Android app build in Cordova.

MediaDB is very much in development and may not be suitable for production purposes.

## Installation

Notes:

- Requires a running [MediaDB API](https://github.com/francoism90/mediadb) instance.
- It is recommend to clone/install MediaDB projects to `/srv/http/mediadb/api` (mediadb-api) and `/srv/http/mediadb/ui` (mediadb-ui).
- See the [api docs](https://github.com/francoism90/mediadb/blob/master/doc/nginx/) for nginx configuration examples.

### Configuration

Please consult to following links:

- [https://quasar.dev/quasar-cli/quasar-conf-js]
- [https://quasar.dev/quasar-cli/build-commands]
- [https://quasar.dev/quasar-cli/developing-cordova-apps/introduction]

### Build project

```bash
cd /srv/http/mediadb/ui
cp .env.example .env
npm install
quasar build
```

### Live project

```bash
cd /srv/http/mediadb/ui
cp .env.example .env
npm install
quasar dev
```
