# Core Module

This module bundles all the essential, cross-cutting concerns required for the application to function. It encapsulates features that are not specific to any single business domain but are used throughout the service.

## Purpose

The `CoreModule` acts as a central hub for shared, foundational services. By importing and exporting these modules, it makes them readily available to other parts of the application, such as the `CmsModule`.

## Sub-modules

The `CoreModule` is composed of the following sub-modules:

-   **[auth](./auth/README.md):** Handles user authentication, JWT generation, and endpoint security.
-   **[cache](./cache/README.md):** Provides a Redis-backed caching layer to improve application performance.
-   **[config](./config/README.md):** Manages application configuration and environment variables.
-   **[database](./database/README.md):** Configures the connection to the PostgreSQL database using TypeORM.
-   **[s3](./s3/README.md):** Provides a service for interacting with S3-compatible object storage for file uploads.