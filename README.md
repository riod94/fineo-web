Fineo Web is a full-stack web application that allows users to create and manage their personal finance with ease.
this project is build with [Next.js](https://nextjs.org/) + [Hono](https://hono.dev/) as backend and [Drizzle](https://orm.drizzle.team/) ORM with Bun as a runtime.

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the following commands:

```bash
bun generate
bun migrate
bun seed
```

Now you can start the server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
You can start editing the api route by modifying `app/api/[[...slugs]]/route.ts`, and `src/BE` folder to edit the backend.

## Learn More

To learn more about Next.js, take a look at the following resources:

-  [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-  [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-  [Hono](https://hono.dev/top) - web application framework.
-  [Drizzle ORM](https://orm.drizzle.team/docs/overview/) - TypeScript ORM.

You can check out [the Fineo Web GitHub repository](https://github.com/riod94/fineo-web/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
