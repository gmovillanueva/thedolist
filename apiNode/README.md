<!-- Intro Section-->
# RESTful API Node Server
A RESTful APIs using [Node.js](https://nodejs.org), [TypeScript](https://www.typescriptlang.org), [Express](https://expressjs.com), and [Prisma](https://www.prisma.io).

<!-- Section-->
## Quick Start
```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

<!-- Section-->
## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Linting](#linting)
- [Contributing](#contributing)

<!-- Section-->
## Features

|     Completed      |          Feature          |                                                              Technology                                                              |
|:------------------:|:-------------------------:|:------------------------------------------------------------------------------------------------------------------------------------:|
| :heavy_check_mark: |     **SQL database**      |                          [PostgreSQL](https://www.postgresql.org) with [Prisma](https://www.prisma.io) ORM                           |
| :heavy_check_mark: |    **Authenticatione**    |                                                [passport](http://www.passportjs.org)                                                 |
| :heavy_check_mark: |    **Data Validation**    |                                                        [Joi](https://joi.dev)                                                        |
| :heavy_check_mark: |        **Logging**        |                  [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)                   |
| :heavy_check_mark: |        **Testing**        |                                                      [Jest](https://jestjs.io)                                                       |
| :heavy_check_mark: |    **Error handling**     |                                                      Centralized Error Handling                                                      |
| :heavy_check_mark: |   **API documentation**   | [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) |
| :heavy_check_mark: | **Environment variables** |             [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)             |
| :heavy_check_mark: |       **Security**        |                                                 [helmet](https://helmetjs.github.io)                                                 |
| :heavy_check_mark: |         **CORS**          |                                              [cors](https://github.com/expressjs/cors)                                               |
| :heavy_check_mark: |      **Compression**      |                                  gzip using [compression](https://github.com/expressjs/compression)                                  |
|        :x:         |    **Docker support**     |                                                                 WIP                                                                  |
| :heavy_check_mark: |        **Linting**        |                                   [ESLint](https://eslint.org) and [Prettier](https://prettier.io)                                   |
| :heavy_check_mark: |    **Editor config**:     |                                                 [EditorConfig](https://editorconfig)                                                 |


<!-- Section-->
## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# Run Tests
```

Database:

```bash
# push changes to db
npx db:push

# start prisma studio
npx db:studio
```

Linting:

```bash
# run ESLint
npm lint

# fix ESLint errors
npm lint:fix

# run prettier
npm prettier

# fix prettier errors
npm prettier:fix
```

<!-- Section-->
## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these
default values:

```bash

# Env Type
NODE_ENV="development"

# Server Info
SERVER_PORT="4000"
SERVER_URL="localhost"

# JWT Info
# JWT secret key
JWT_SECRET="sample"
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES="30"
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS="30"



# SMTP Configuration Options for Email Service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=support@yourapp.com

# Postgres Info
DATABASE_NAME="name"
DATABASE_USER="user"
DATABASE_PASSWORD="password"
DATABASE_HOST="host"
DATABASE_PORT="5432"
DATABASE_SCHEMA="public"

# URL of the PostgreSQL database
DATABASE_URL=postgresql://postgres:secret@localhost:5432/mydb?schema=publicDATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}"

```

<!-- Section-->
## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers
 |--docs\           # Swagger files
 |--lib\            # Library for Errors, Logger, etc
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Service layer
 |--types\          # Custom types
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # App Setup
 |--index.ts        # Entry point
 |--server.ts       # Server
```

<!-- Section-->
## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://
localhost:4000/docs` in your browser. This documentation page is automatically generated
using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/register` - Register\
`POST /auth/login` - Login\
`POST /auth/refresh-tokens` - Refresh auth tokens\
`POST /auth/forgot-password` - Send reset password email\
`POST /auth/reset-password` - Reset password\
`POST /auth/send-verification-email` - Send verification email\
`POST /auth/verify-email` - Verify email

**User routes**:\
`POST   /users` - Creates user\
`GET    /users` - Grab all users\
`GET    /users/:userId` - Grab a user\
`PATCH  /users/:userId` - Update user\
`DELETE /users/:userId` - Delete user

<!-- Section-->
## Error Handling


<!-- Section-->
## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.
dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes
by providing them as parameters to the `validate` middleware.

```javascript

const router = express.Router();

router.post('/users', validate(userValidation.createUser), userController.createUser);
```

<!-- Section-->
## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
router.post('/users', auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the
Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error
is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /auth/
register`) or login (`POST /auth/login`) endpoints. The response of these endpoints also
contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the
`JWT_ACCESS_EXPIRATION_MINUTES` environment variable in the .env file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the
refresh token endpoint (`POST /auth/refresh-tokens`) and sending along a valid refresh token
in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the
`JWT_REFRESH_EXPIRATION_DAYS` environment variable in the .env file.

<!-- Section-->
## Authorization

The `auth` middleware can also be used to require certain rights/permissions to access a route.

```javascript
router.post('/users', auth('manageUsers'), userController.createUser);
```

In the example above, an authenticated user can access this route only if that user has the
`manageUsers` permission.

The permissions are role-based. You can view the permissions/rights of each role in the `src/
config/roles.js` file.

If the user making the request does not have the required permissions to access this route, a
Forbidden (403) error is thrown.

<!-- Section-->
## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/
winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most
important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console.\
It is up to the server (or process manager) to actually read them from the console and store
them in log files.\
This app uses pm2 in production mode, which is already configured to store the logs in log files

Note: API request information (request url, response code, timestamp, etc.) are also
automatically logged (using [morgan](https://github.com/expressjs/morgan)).

<!-- Section-->
## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.
com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) with some modifications.
It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to
turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier
configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.
prettierignore`.

To maintain a consistent coding style across different IDEs, the project contains `.editorconfig

<!-- Section-->
## Contributing

Contributions are more than welcome!

<!-- Section-->

<!-- Section-->
## License

[MIT](LICENSE)
