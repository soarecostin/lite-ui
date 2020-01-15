# Lite UI

## Demo

* You can access a demo at https://lite-ui.dev.soa.re

## Setup

### Installation

Clone this repository
```
git clone git@github.com:soarecostin/lite-ui.git
```

Inside the project directory, install the project dependencies using `npm` or `yarn`
```
yarn install
```

### Environment configuration

Copy the `.env.example` file to `.env`
```
cp .env.example .env
```
Set the `BASE_URL` variable inside the `.env` file (default is set to `http://localhost:8000` which is valid if you've started the API with `php artisan serve`. If you have a different local URL for the API, add it to the `BASE_URL` variable.


### Local development server

To launch Nuxt in development mode with hot reloading:
```
yarn dev
```
This will start a local server at `http://localhost:3000`

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
