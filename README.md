# PWHLCord Stats

A site for tracking meta stats from the unofficial PWHL Discord server

## Table of Contents

- [Bug Reports](#bug-reports)
- [Developing](#developing)
    - [Requirements](#requirements)
    - [Dependencies and Frameworks](#dependencies-and-frameworks)
    - [Setup and Running](#setup-and-running)
    - [Useful Scripts](#useful-scripts)
    - [Additional Commands](#additional-commands)
- [Deploying](#deploying)
- [Contributing](#contributing)
- [License](#license)
- [Disclaimers](#disclaimers)

## Bug Reports

Please report bugs by opening an [issue](https://github.com/asleepysheepy/pwhlcord-stats/issues/new) on GitHub.

## Developing

### Requirements

- [NodeJS](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
  - Can be installed locally, through docker/docker-compose, or through a service like [Neon](https://neon.com/)

### Dependencies and Frameworks

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) / [shadcn](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/icons/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Storybook](https://storybook.js.org/)
- [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/)

### Setup and Running

1. Start by cloning the repo locally

```sh
git clone https://github.com/asleepysheepy/pwhlcord-stats.git && cd pwhlcord-stats
```

2. Install NPM dependencies

```sh
npm install
```

3. Create `.env` file

```sh
cp .env.example .env
```

5. Setup the database

```sh
npx prisma migrate dev
```

6. Run the app in development mode

```sh
npm run dev
```

### Useful Scripts

- `build` - Gets the app ready for production. Generates the Prisma client, migrates the database, and creates a production build of the app
- `dev` - Runs the app in development mode
- `format` - Uses Prettier to format the codebase
- `lint` - Uses ESLint to lint the codebase, can be run with the `--fix` option to automatically fix many issues
- `start` - Starts the production build of the app
- `test` - Runs the test suite
- `test:watch` - Runs the test suite in "watch" mode, automatically rerunning the suite when code changes are saved
- `typecheck` - Checks the type safety of the codebase using typescript
- `validate` - Shortcut to run `typecheck`, `lint`, and `test` together

### Additional Commands

- `npx prisma db seed` - Seeds the database
- `npx prisma migrate dev` - Runs database migrations for development
- `npx prisma migrate reset` - Drops and recreates the database

## Deploying

PWHLCord Stats includes a deployable Dockerfile. See the [React Router Docs](https://reactrouter.com/start/framework/deploying) for more information about deploying.

## Contributing

All contributions to this project are welcome. Contributors are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

## Disclaimers

This project is in no way connected to the Professional Women's Hockey League (PWHL) or any of its respective teams. Names, logos, and other trademarks are he property of their respective owners and used here under the fair use doctrine. If you are the owner of a trademark used on this site and would like it removed, please [contact us](mailto:katie@sleepysheepy.dev). 