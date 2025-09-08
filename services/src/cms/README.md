# CMS Module

This module is the heart of the content management system. It encapsulates all the features and business logic required to manage the core entities of the Thmanyah Streaming platform.

## Purpose

The `CmsModule` acts as a central aggregator for all the individual modules that handle specific content types. It provides a unified interface for the rest of the application to interact with the CMS functionalities.

## Sub-modules

The `CmsModule` is composed of the following sub-modules, each responsible for a specific domain:

-   **[categories](./categories/README.md):** Manages content categories and classifications.
-   **[episodes](./episodes/README.md):** Manages individual episodes within a program.
-   **[media](./media/README.md):** Handles the upload, processing, and management of media assets like images, audio, and video files.
-   **[programs](./programs/README.md):** Manages the top-level content entities, such as shows or series.
-   **[users](./users/README.md):** Manages CMS users, roles, and permissions.

Each of these modules follows a standard NestJS structure, typically including a controller, service, repository, and entity definition.