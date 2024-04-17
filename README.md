It is a fullstack project with nest js an prisma for Backend and Next js with tailwind, react query, and axios for front end

## Requirements

Things you need to install:

- PostgreSQL
- Node JS >= 18
- Yarn / NPM

## Getting Started

First, run the development server:

```bash
# install dependencies for backend with
cd nestjs-rest
yarn install
npx prisma migrate dev --name migrate_dbPrisma
yarn start:dev

# and run it with
cd nestjs-fe
yarn install
yarn dev


# then run in your local with
yarn dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result BackEnd.
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result FrontEns.`
