# Common Module

This module contains shared code and utilities that are used across multiple modules within the CMS service. It is designed to promote code reuse and maintain a consistent architectural pattern.

## Purpose

The `CommonModule` provides a set of base classes, interfaces, and enums that form the foundation of the other CMS modules. By centralizing this shared logic, we avoid code duplication and make it easier to maintain and extend the application.

## Core Components

### Base Classes

The `base` directory contains a set of abstract classes that provide generic functionality for CRUD operations, pagination, and caching.

-   **`BaseRepository<T>`**: An abstract repository that implements a standard set of methods for interacting with the database (e.g., `create`, `findById`, `findWithPagination`). It uses TypeORM's `Repository` under the hood.

-   **`BaseService<T>`**: An abstract service that provides the core business logic for CRUD operations. It uses a `BaseRepository` for data access and integrates with the `ICacheService` to provide a caching layer for `find` operations and cache invalidation for `create`, `update`, and `delete` operations.

-   **`BaseController<T>`**: An abstract controller that provides a standard set of RESTful endpoint handlers (e.g., `_findAll`, `_findOne`, `_create`). It handles common tasks like parsing pagination queries, filtering, sorting, and selecting fields.

### Enums

The `enums` directory contains standard enumerations used throughout the application:

-   **`ContentStatus`**: Defines the status of content (e.g., `DRAFT`, `SCHEDULED`, `PUBLISHED`).
-   **`Language`**: Defines the supported languages (e.g., `EN`, `AR`).
-   **`MediaType`**: Defines the types of media (e.g., `PODCAST`, `MOVIE`, `SERIES`).