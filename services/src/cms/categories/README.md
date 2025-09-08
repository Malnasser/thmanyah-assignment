# Categories Module

This module is responsible for managing content categories within the CMS. It provides a complete set of CRUD (Create, Read, Update, Delete) operations for category entities.

## Purpose

The primary purpose of this module is to allow administrators to classify programs into different categories (e.g., "Documentary", "Drama", "Comedy"). These categories can then be used to filter and organize content for viewers.

## API Endpoints

The module exposes the following RESTful API endpoints under the `/categories` path:

| Method | Path         | Description              |
| ------ | ------------ | ------------------------ |
| `POST` | `/`          | Creates a new category.  |
| `GET`  | `/`          | Retrieves all categories (paginated). |
| `GET`  | `/:id`       | Retrieves a single category by its ID. |
| `PATCH`| `/:id`       | Updates an existing category. |
| `DELETE`| `/:id`      | Deletes a category.      |

## Entity Schema

The `Category` entity has the following structure:

| Field      | Type      | Description                                      |
| ---------- | --------- | ------------------------------------------------ |
| `id`       | `uuid`    | The unique identifier for the category.          |
| `name`     | `string`  | The name of the category (e.g., "Documentary"). Must be unique. |
| `programs` | `Program[]`| A list of programs associated with this category. |
| `createdAt`| `Date`    | The timestamp when the category was created.     |
| `updatedAt`| `Date`    | The timestamp when the category was last updated.|

## Service and Caching

The `CategoriesService` extends a `BaseService`, which provides the core logic for handling the CRUD operations. It also integrates with a caching layer (`ICacheService`) to improve performance by caching category data, reducing the number of database queries.