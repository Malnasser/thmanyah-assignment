# Episodes Module

This module manages the episodes associated with programs. It handles the creation, retrieval, modification, and deletion of episode entities.

## Purpose

The `EpisodesModule` allows for the detailed management of individual pieces of content within a larger program. This includes handling metadata like titles, descriptions, publishing dates, and linking to the actual media files.

## API Endpoints

The module exposes standard RESTful endpoints under the `/episodes` path:

| Method | Path   | Description                |
| ------ | ------ | -------------------------- |
| `POST` | `/`    | Creates a new episode.     |
| `GET`  | `/`    | Retrieves all episodes (paginated). |
| `GET`  | `/:id` | Retrieves a single episode by its ID. |
| `PATCH`| `/:id` | Updates an existing episode. |
| `DELETE`| `/:id`| Deletes an episode.        |

## Entity Schema

The `Episode` entity contains detailed information about an episode:

| Field         | Type            | Description                                      |
| ------------- | --------------- | ------------------------------------------------ |
| `id`          | `uuid`          | The unique identifier for the episode.           |
| `title`       | `string`        | The title of the episode.                        |
| `description` | `string`        | A text description of the episode.               |
| `language`    | `string`        | The language of the episode (e.g., 'en', 'ar').  |
| `duration`    | `number`        | The duration of the episode in seconds.          |
| `publishDate` | `Date`          | The date and time when the episode is scheduled to be published. |
| `status`      | `ContentStatus` | The current status of the episode (`draft`, `scheduled`, `published`). |
| `metadata`    | `jsonb`         | A flexible field for any additional metadata.    |
| `media`       | `MediaUpload`   | A foreign key relationship to the associated media file. |
| `program`     | `Program`       | A foreign key relationship to the parent program. |
| `searchVector`| `tsvector`      | A pre-computed vector for full-text search.      |

## Service and Caching

The `EpisodesService` extends the `BaseService`, providing standard CRUD operations with integrated caching to optimize performance.