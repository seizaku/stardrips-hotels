
# Stardrips Hotels

Stardrips is a service that collects emails from hotels and finds promotions like discounts and special offers. It organizes the information, making it easy for businesses to use.

![App Screenshot](https://i.ibb.co/2czYK3v/Screenshot-2024-12-02-023533.png)


## Project Structure

```
├───.github
│   └───workflows
│
├───public
│       favicon.ico
│
└───src
    │   env.js
    │
    ├───app
    │   │   layout.tsx
    │   │   page.tsx
    │   │
    │   ├───api
    │   │   ├───auth
    │   │   │       route.ts
    │   │   │
    │   │   ├───pubsub
    │   │   │       route.ts
    │   │   │
    │   │   └───trpc
    │   │       └───[trpc]
    │   │               route.ts
    │   │
    │   ├───auth
    │   │       page.tsx
    │   │
    │   ├───emails
    │   │       page.tsx
    │   │
    │   ├───hotels
    │   │       page.tsx
    │   │
    │   ├───listings
    │   │       page.tsx
    │   │
    │   └───promotions
    │           page.tsx
    │
    ├───components
    │   │   export-csv.tsx
    │   │
    │   ├───layouts
    │   │       container.tsx
    │   │       navbar.tsx
    │   │
    │   ├───table
    │   │       column-resize.tsx
    │   │       table-skeleton.tsx
    │   │
    │   └───ui
    │           alert-dialog.tsx
    │           button.tsx
    │           checkbox.tsx
    │           dialog.tsx
    │           dropdown-menu.tsx
    │           input.tsx
    │           navigation-menu.tsx
    │           select.tsx
    │           skeleton.tsx
    │           sonner.tsx
    │           table.tsx
    │
    ├───config
    │       site-config.ts
    │
    ├───features
    │   ├───auth
    │   │   └───components
    │   │           auth.tsx
    │   │           watch.tsx
    │   │
    │   ├───emails
    │   │   ├───components
    │   │   │   └───data-table
    │   │   │           columns.tsx
    │   │   │           data-table.tsx
    │   │   │           emails.tsx
    │   │   │
    │   │   └───stores
    │   │           email-store.ts
    │   │
    │   ├───hotels
    │   │   ├───components
    │   │   │   │   cell-edit.tsx
    │   │   │   │
    │   │   │   └───data-table
    │   │   │           columns.tsx
    │   │   │           data-table.tsx
    │   │   │           hotels.tsx
    │   │   │
    │   │   └───stores
    │   │           table-store.tsx
    │   │
    │   ├───listings
    │   │   ├───components
    │   │   │   └───data-table
    │   │   │           columns.tsx
    │   │   │           data-table.tsx
    │   │   │           listings.tsx
    │   │   │
    │   │   └───stores
    │   │           table-store.ts
    │   │
    │   ├───promotions
    │   │   ├───components
    │   │   │   │   image-magnifier.tsx
    │   │   │   │   image-modal.tsx
    │   │   │   │
    │   │   │   └───data-table
    │   │   │           columns.tsx
    │   │   │           data-table.tsx
    │   │   │           promotions.tsx
    │   │   │
    │   │   └───stores
    │   │           promo-store.ts
    │   │
    │   └───pubsub
    │       └───helpers
    │               domain.ts
    │               email.ts
    │               gmail.ts
    │
    ├───lib
    │       table.ts
    │       utils.ts
    │
    ├───server
    │   └───api
    │       │   root.ts
    │       │   trpc.ts
    │       │
    │       ├───common
    │       │       bigquery.ts
    │       │       gmail.ts
    │       │       oauth.ts
    │       │
    │       └───routers
    │           ├───auth
    │           │       router.ts
    │           │
    │           ├───emails
    │           │       router.ts
    │           │
    │           ├───hotels
    │           │       router.ts
    │           │
    │           ├───listings
    │           │       router.ts
    │           │
    │           ├───promos
    │           │       router.ts
    │           │
    │           └───pubsub
    │                   router.ts
    │
    ├───styles
    │       globals.css
    │
    └───trpc
            query-client.ts
            react.tsx
            server.ts
```
## Installation

To get a local copy up and running, follow these simple steps:

Clone the repository:
```bash
https://github.com/seizaku/stardrips-hotels.git
```

Install Dependencies:
```bash
npm install
```

Run the Development Server:
```bash
npm run dev
```

## Usage

To configure and use this project, please follow these instructions:

1. Access the application's authentication route by navigating to `/auth`.
2. Select the "Request Token" option to generate a token.
3. Copy the generated `refresh token`.
4. Locate the `.env` file in the root directory of your project and open it.
5. Add the copied refresh token to the file as follows:

   ```
   CLIENT_REFRESH_TOKEN=your_copied_refresh_token_here
   ```

6. Save the changes and, if necessary, restart your server to apply the new configuration.

Upon successful setup, new emails will be processed and delivered to the `/api/pubsub` endpoint through the Pub/Sub webhook, ensuring continuous updates with the latest email data.

Please ensure that your environment variables remain private and secure.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PROJECT_ID`

`SERVICE_EMAIL`

`SERVICE_PRIVATE_KEY`

`REDIRECT_URL`

`CLIENT_ID`

`CLIENT_SECRET`

`CLIENT_REFRESH_TOKEN`