# React Project with Storybook

This project is built using React and includes Storybook for UI component development and testing.

## Prerequisites

Ensure you have the following installed:

- **Node.js** (>=16.x recommended)
- **npm** or **yarn** (package manager)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
   or if using Yarn:
   ```sh
   yarn install
   ```

## Running the React App

To start the development server:
```sh
npm run dev
```
or
```sh
yarn dev
```

By default, the app runs at `http://localhost:5173/` (if using Vite).

## Running Storybook

Storybook is used for UI component development and testing.

To start Storybook:
```sh
npm run storybook
```
or
```sh
yarn storybook
```

By default, Storybook runs at `http://localhost:6006/`.

## Building the Project

To create a production build of the React app:
```sh
npm run build
```
or
```sh
yarn build
```

To build Storybook for deployment:
```sh
npm run build-storybook
```
or
```sh
yarn build-storybook
```

## Running Tests

If you have tests set up, you can run them with:
```sh
npm test
```
or
```sh
yarn test
```

## Linting & Formatting

To check for linting issues:
```sh
npm run lint
```
or
```sh
yarn lint
```

To format code using Prettier:
```sh
npm run format
```
or
```sh
yarn format
```

## Deployment

For deployment, build the app and serve it using a static file server or a hosting provider like Vercel or Netlify:
```sh
npm run build
npm run preview
```
or
```sh
yarn build
yarn preview
```

## License

This project is licensed under [MIT License](LICENSE).

## Contributing

Feel free to open issues or submit pull requests to improve this project!