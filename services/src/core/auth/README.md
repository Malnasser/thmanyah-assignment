# Auth Module

This module handles all aspects of user authentication and authorization. It implements a JSON Web Token (JWT) based authentication strategy.

## Purpose

The `AuthModule` is responsible for verifying user credentials, generating access tokens, and securing endpoints. It works in conjunction with the `UsersModule` to manage user data.

## Authentication Flow

1.  **Login:** A user submits their email and password to the `/auth/login` endpoint.
2.  **Credential Verification:** The `AuthService` validates the credentials against the user data stored in the database.
3.  **Token Generation:** Upon successful validation, the `TokenService` generates a JWT access token and a refresh token.
4.  **Response:** The access token is returned to the user, who must include it in the `Authorization` header for subsequent requests to protected endpoints.

## API Endpoints

| Method | Path    | Description                |
| ------ | ------- | -------------------------- |
| `POST` | `/login`| Logs in a user and returns a JWT access token. |

## Core Components

-   **`AuthService`**: Contains the core logic for user registration and login, including password hashing and validation.
-   **`TokenService`**: Responsible for generating and verifying JWTs (both access and refresh tokens) using the configuration provided by the `ConfigModule`.
-   **`JwtStrategy`**: A Passport.js strategy that extracts the JWT from the request, validates its signature, and retrieves the corresponding user from the database.
-   **`JwtAuthGuard`**: A global authentication guard that protects all endpoints by default. It checks for a valid JWT in the request header. Endpoints can be exempted from this guard by using the `@Public()` decorator.

## Decorators

-   **`@Public()`**: A custom decorator that marks an endpoint as public, allowing unauthenticated access. This is used for the `/auth/login` endpoint.
-   **`@GetUser()`**: A parameter decorator that can be used in controller methods to directly access the authenticated `User` object from the request.