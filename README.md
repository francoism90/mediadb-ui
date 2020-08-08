# MediaDB Front-end

**MediaDB** is a web-based video streaming service written in Laravel and Vue ([Quasar](https://quasar.dev/)).

The front-end requires a running [MediaDB API](https://github.com/francoism90/mediadb) instance.

- Video previews as seen on YouTube.
- Display thumbnails from a sprite image when hovering over the progress bar.
- Manage library using tags and collections.
- Searching and filtering.

MediaDB is very much in development and is not yet suitable for production purposes.

## Installation

Note: it is recommend to clone/install MediaDB projects to `/srv/http/mediadb/api` (mediadb-api) and `/srv/http/mediadb/ui` (mediadb-ui).

### Build project

```bash
cd /srv/http/mediadb/ui
cp .env.example .env
npm install
quasar build
```

### Configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

## Development

### Live project

```bash
cd /srv/http/mediadb/ui
cp .env.example .env.local
npm install
quasar dev
```
