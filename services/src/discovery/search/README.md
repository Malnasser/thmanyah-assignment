# Search Module

This module provides the core search functionality for the discovery API.

## Purpose

The `SearchModule` allows users to find programs by searching for keywords and applying various filters. It leverages the existing `ProgramsService` to query the database and return relevant results.

## API Endpoints

The module exposes the following endpoint:

| Method | Path              | Description                                      |
| ------ | ----------------- | ------------------------------------------------ |
| `GET`  | `/discovery/search` | Searches for programs based on query parameters. |

### Query Parameters

The search endpoint accepts the following query parameters, defined in the `SearchProgramDto`:

| Parameter  | Type     | Description                                      |
| ---------- | -------- | ------------------------------------------------ |
| `keyword`  | `string` | A search term to find in program titles.         |
| `page`     | `number` | The page number for pagination (default: 1).     |
| `limit`    | `number` | The number of items per page (default: 10).      |
| `category` | `string` | The name of a category to filter by.             |
| `language` | `string` | The language code to filter by (e.g., 'en', 'ar'). |

## Service Implementation

The `SearchService` takes the search DTO, constructs a filter object, and then passes it to the `programsService.findWithPagination` method. For the `keyword` search, it uses a `LIKE` query to find partial matches in the program titles.