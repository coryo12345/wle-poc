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
You can run the stack with docker compose. Pocketbase does not have start-up import of collection definitions, so you will have to import them manually.
1. `docker compose up`
2. Navigate to: http://localhost:8090/_ to view the admin panel for PocketBase.
3. Create an admin account with any email/password.
4. Go to Settings -> Import Collections
5. Import the pb_schema.json file located at `realtime/pb_schema.json`.
