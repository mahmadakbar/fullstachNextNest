It is a fullstack project with nest js an prisma for Backend and Next js with tailwind, react query, and axios for front end

## Requirements

Things you need to install:

- PostgreSQL
- Node JS >= 18
- Yarn / NPM

## Getting Started

First, create a local databese in posstgre called **jwttest**.
or you can modify [the .env](https://github.com/mahmadakbar/fullstackNextNest/blob/main/nestjs-rest/.env) in nest js res to your database configurasion
for exampe :
```bash
DATABASE_URL="postgresql://<username>:<password>@<url>:<port>/<database>?schema=public"

# and the result is
DATABASE_URL="postgresql://postgres:root@localhost:5432/jwttest?schema=public"
```

Second, run the development server:

```bash
# install dependencies for backend with
cd nestjs-rest
yarn install
npx prisma migrate dev --name migrate_dbPrisma
# then run in your local BE with
yarn start:dev

# and install dependencies for frontend with
cd nestjs-fe
yarn install
# then run in your local FE with
yarn dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result BackEnd.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result FrontEnd.
