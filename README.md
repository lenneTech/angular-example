# Angular example

This is an example of an [Angular](https://angular.io/) app in lenne.Tech's fullstack. It illustrates the use of the
[Angular Base](https://github.com/lenneTech/ng-base/tree/main/projects/ng-base) library
in interaction with the [lenne.Tech Nest Server](https://github.com/lenneTech/nest-server).

The Angular frontend and the NestServer can be set up separately or in a [Monorepro](https://nx.dev/latest/angular/core-concepts/why-monorepos).
This example was created as a Monorepro.

If you are not yet familiar with Angular or Nest, we recommend the following courses:
- for Angular: [Angular - The Complete Guide](https://www.udemy.com/course/the-complete-guide-to-angular-2/)
- for Nest: [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero/)

## Table of contents

- [Requirements](#requirements)
- [Usage](#usage)
- [Creation log](#creation-log)
- [Further development](#further-development)

## Requirements

- [Node.js](https://nodejs.org/en/download/package-manager/) (version LTS 14, incl. npm)
- [MongoDB](https://docs.mongodb.com/manual/installation/) (version 4)
- [nx (@nrwl/cli)](https://www.npmjs.com/package/@nrwl/cli) (version 12)

## Usage

Initialization
```
npm i
```

Start (for development)
```
# Start server in a  tab
npm start:server

# Start example app in another tab
npm start
```

Test (unit tests)
```
npm run test
```

Lint
```
npm run lint
```

e2e tests
```
npm run e2e
```

Build (for productive)
```
npm build
```

For more see scripts in `package.json`


## Creation log

The creation history is intended to illustrate how this example was built.

Install lenne.Tech CLI:
```
npm i -g @lenne.tech/cli
```

Create angular-nest workspace `lt` with `example` App and Nest API:
```
lt angular c lt example true
```

`lt`: Global lenne.Tech CLI    
`angular`: Name of CLI area  
`c`: Short for `create` a new (fullstack) workspace  
`lt`: Name of the workspace  
`example`: Name of the Angular app  
`true`: Integrate Nest API

## Further development

This project was generated using [Nx](https://nx.dev) via [lenne.Tech CLI](https://github.com/lenneTech/cli).

### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@lt/mylib`.

### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
