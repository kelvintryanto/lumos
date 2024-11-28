# API Documentation

### Error List

| **Error Name**                       | **HTTP Status Code** | **Message**                      | **Description**                                                          |
| ------------------------------------ | -------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `SequelizeValidationError`           | 400                  | Custom message from Sequelize    | Occurs when a database validation fails.                                 |
| `SequelizeUniqueConstraintError`     | 400                  | Custom message from Sequelize    | Triggered when a unique constraint is violated, e.g., duplicate email.   |
| `SequelizeDatabaseError`             | 400                  | "Invalid input"                  | Occurs due to a database query error, such as invalid input.             |
| `SequelizeForeignKeyConstraintError` | 400                  | "Invalid input"                  | Happens when a foreign key relationship is broken or input is invalid.   |
| `BadRequest`                         | 400                  | "Please input email or password" | Occurs when the request input is incomplete or invalid.                  |
| `JsonWebTokenError`                  | 400                  | "Invalid token"                  | Happens when the authentication token is invalid.                        |
| `Unauthorized`                       | 401                  | "Please login first"             | Occurs when trying to access a resource without authentication.          |
| `LoginError`                         | 401                  | "Invalid email or password"      | Happens when login credentials are incorrect.                            |
| `Forbidden`                          | 403                  | "You are not allowed"            | Triggered when the user does not have permission to access the resource. |
| `NotFound`                           | 404                  | "Data with id {id} not found"    | Data with the specified ID does not exist.                               |
| Default                              | 500                  | "Internal Server Error"          | A generic error for unexpected server issues.                            |

### Endpoint List

| **Endpoint**      | **Method** | **Req Headers**                       | **Request Body**                 | **Response (Success)**    |
| ----------------- | ---------- | ------------------------------------- | -------------------------------- | ------------------------- |
| `/login`          | `POST`     | None                                  | { `email`,`password`}            | `200`:{access_token}      |
| `/register`       | `POST`     | None                                  | { `username`,`email`,`password`} | `201`:{message, users}    |
| `/user/read`      | `GET`      | `{ "Authorization": "Bearer token" }` | None                             | `200`:{message, users}    |
| `/user/update`    | `PUT`      | `{ "Authorization": "Bearer token" }` | Form data for image and data     | `200`:{message, users}    |
| `/user/delete`    | `DELETE`   | `{ "Authorization": "Bearer token" }` | None                             | `201`:{message, users}    |
| `/journal`        | `GET`      | `{ "Authorization": "Bearer token" }` | None                             | `200`:{message, journals} |
| `/journal/latest` | `GET`      | `{ "Authorization": "Bearer token" }` | None                             | `200`:{message,journal}   |
| `/journal/create  | `POST`     | `{ "Authorization": "Bearer token" }` | Form data for image and data     | `200`:{message,journal}   |
| `/journal/:id`    | `GET`      | `{ "Authorization": "Bearer token" }` | None                             | `200`:{message,journal}   |
| `/journal/:id`    | `PATCH`    | `{ "Authorization": "Bearer token" }` | Form data for image and data     | `200`:{message,journal}   |
| `/journal/:id`    | `DELETE`   | `{ "Authorization": "Bearer token" }` | None                             | `201`:{message,journal}   |
