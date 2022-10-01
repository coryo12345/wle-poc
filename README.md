# POC of WLE project
Builing a POC of WLE project

## Overview of Services
### UI
The forward facing user interface for interacting with the application as a user.
* Vue 3
* Vite
* Element Plus component library
* Vue Router
* Pinia for state management

### Realtime Backend
Using [PocketBase](https://pocketbase.io/), an open source, self hosted, backend-as-a-service (BaaS).

The collection schema defined in: realtime/pb_schema.json

### Verse Service
A standalone, stateless service for retrieving verse text using standard WLE verse ids.
* TypeScript
* Express

## Running Locally
TODO: move all services to docker containers
You can run the stack with docker compose.
* `docker compose up`
