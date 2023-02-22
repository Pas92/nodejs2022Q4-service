# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application with Docker

Change filename '.env.example' to '.env'

Run application

```
npm run docker:up
```
After starting the app on port (5000 as default, you can set the PORT in '.env' file) you can open
in your browser OpenAPI documentation by typing

```
http://localhost:5000/api
```

It's also possible to use pgAdmin in your browser by typing

```
http://localhost:8080
```

Connection settings:
 - Host name: `homelib_pg`
 - Port: `5432`
 - Maintenance database: `home-library`
 - Username: `root`
 - Password: `pass`


Check image for vulnerabilities

```
npm run docker:scan
```

## Running application without Docker

Change filename '.env.example' to '.env'


Production mode
```
npm run start
```

Development mode
```
npm run start
```

After starting the app on port (5000 as default, you can set the PORT in '.env' file) you can open
in your browser OpenAPI documentation by typing http://localhost:5000/api.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
You also can use 'api.yaml' file in 'doc' folder

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
