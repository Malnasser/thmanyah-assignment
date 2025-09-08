# Programs Module

This module is responsible for managing the top-level content entities, such as shows, series, or podcasts. It is a central piece of the CMS, connecting categories, episodes, and media.

## Purpose

The `ProgramsModule` allows for the creation and management of programs, which act as containers for individual episodes. It handles program metadata, categorization, and poster image uploads.

## API Endpoints

The module exposes the following RESTful endpoints under the `/programs` path:

| Method | Path                 | Description                                      |
| ------ | -------------------- | ------------------------------------------------ |
| `POST` | `/`                  | Creates a new program.                           |
| `GET`  | `/`                  | Retrieves all programs (paginated).              |
| `GET`  | `/:id`               | Retrieves a single program by its ID.            |
| `PATCH`| `/:id`               | Updates an existing program.                     |
| `DELETE`| `/:id`              | Deletes a program.                               |
| `POST` | `/:id/upload-poster` | Uploads a poster image for a specific program.   |

## Entity Schema

The `Program` entity has a rich set of fields to describe a program:

| Field         | Type            | Description                                      |
| ------------- | --------------- | ------------------------------------------------ |
| `id`          | `uuid`          | The unique identifier for the program.           |
| `title`       | `string`        | The title of the program.                        |
| `description` | `string`        | A text description of the program.               |
| `mediaType`   | `MediaType`     | The type of media (e.g., `podcast`, `movie`).    |
| `language`    | `Language`      | The primary language of the program.             |
| `publishDate` | `Date`          | The date the program is scheduled to be published. |
| `status`      | `ContentStatus` | The current status of the program (`draft`, `published`). |
| `metadata`    | `jsonb`         | A flexible field for any additional metadata.    |
| `category`    | `Category`      | A foreign key relationship to the program's category. |
| `poster`      | `MediaUpload`   | A foreign key relationship to the program's poster image. |
| `episodes`    | `Episode[]`     | A list of episodes belonging to this program.    |
| `searchVector`| `tsvector`      | A pre-computed vector for full-text search.      |

## Special Features

### Poster Upload

The `ProgramsController` includes a special `/:id/upload-poster` endpoint that accepts `multipart/form-data`. This endpoint uses the `MediaService` to upload the image to S3 and then associates the resulting media record with the program as its poster.

### Service Logic

The `ProgramsService` contains custom logic to handle relationships. When creating or updating a program, it validates the provided `categoryId` and correctly associates the program with a `Category` entity. It also includes an `attachPoster` method to link an uploaded poster to a program.