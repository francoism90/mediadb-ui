# MediaDB Front-end

**MediaDB** is a web-based video streaming service written in Laravel and Vue ([Quasar](https://quasar.dev/)).

The front-end requires a running [MediaDB API](https://github.com/francoism90/mediadb) instance.

- Video previews as seen on YouTube.
- Display thumbnails from a sprite image when hovering over the progress bar.
- Manage library using tags and collections.
- User roles and permissions.
- Searching and filtering.

MediaDB is very much in development and is not yet suitable for production purposes.

## Installation

Notes:

- It is recommend to clone/install MediaDB projects to `/srv/http/mediadb/api` (mediadb-api) and `/srv/http/mediadb/ui` (mediadb-ui).
- See the [api docs](https://github.com/francoism90/mediadb/blob/master/doc/nginx/) for nginx configuration examples.

### Configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Build project

```bash
cd /srv/http/mediadb/ui
cp .env.example .env
npm install
quasar build
```

## Development

### Live project

```bash
cd /srv/http/mediadb/ui
cp .env.example .env
npm install
quasar dev
```
