# Media Module

This module is responsible for handling media uploads, storage, and management. It provides a generic way to manage different types of media files, such as images, audio, and video.

## Purpose

The `MediaModule` abstracts the complexities of file storage and retrieval. It integrates with an S3-compatible object storage service to handle file uploads and provides a database representation of the uploaded media, which can then be associated with other entities like programs (for posters) and episodes (for playable content).

## API Endpoints

The module exposes standard RESTful endpoints under the `/media` path for managing media metadata:

| Method | Path   | Description                |
| ------ | ------ | -------------------------- |
| `POST` | `/`    | Creates a new media record. |
| `GET`  | `/`    | Retrieves all media records (paginated). |
| `GET`  | `/:id` | Retrieves a single media record by its ID. |
| `PATCH`| `/:id` | Updates an existing media record. |
| `DELETE`| `/:id`| Deletes a media record.      |

**Note:** Direct file uploads are typically handled by other modules (e.g., `ProgramsController` for posters) that use the `MediaService` internally.

## Entity Schema

The `MediaUpload` entity represents a file in object storage:

| Field      | Type      | Description                                      |
| ---------- | --------- | ------------------------------------------------ |
| `id`       | `uuid`    | The unique identifier for the media record.      |
| `fileUrl`  | `string`  | The URL of the file in the S3 bucket.            |
| `type`     | `string`  | The general type of media (e.g., 'image', 'video'). |
| `mimeType` | `string`  | The MIME type of the file (e.g., 'image/jpeg').  |
| `size`     | `number`  | The size of the file in bytes.                   |
| `duration` | `number`  | The duration of the media in seconds (if applicable). |
| `metadata` | `jsonb`   | A flexible field for any additional metadata.    |

## Service and S3 Integration

The `MediaService` contains a crucial method, `uploadToS3`. This method takes a file stream, name, and MIME type, uploads the file to the configured S3 bucket, and creates a corresponding `MediaUpload` entity in the database. This provides a robust way to handle file uploads and link them to the CMS data.