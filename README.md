# Node.js SEA (Single Executable Application) with Express.js, TypeScript, and esbuild

This is a template for creating Single Executable Applications (SEA) for Node.js Express.js servers, using TypeScript and esbuild. The build process is containerized with Docker to allow for cross-platform builds.

## Features

- **Node.js SEA**: Package your application into a single executable.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **esbuild**: An extremely fast JavaScript bundler and minifier.
- **Docker**: Containerize the build process for cross-platform compatibility.

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v20.x or later)
- [Docker](https://www.docker.com/get-started)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

## Available Scripts

- `npm start`: Start the application from the bundled output.
- `npm run dev`: Start the application in development mode with file watching.
- `npm run clean`: Remove the `dist` directory.
- `npm run build:ts`: Build the TypeScript source code using esbuild.
- `npm run build:sea`: Build the Single Executable Application for the host machine.
- `npm run build:docker:arm64`: Build a Docker image for `linux/arm64`.
- `npm run build:docker:amd64`: Build a Docker image for `linux/amd64`.
- `npm run extract:sea:arm64`: Extract the `linux/arm64` executable from its Docker image.
- `npm run extract:sea:amd64`: Extract the `linux/amd64` executable from its Docker image.

## Building the Single Executable Application (SEA)

### Local Build

To build the SEA on your local machine, run the following command:

```bash
npm run build:sea
```

This will generate an executable file named `app` in the `dist` directory.

### Cross-Platform Build with Docker

To build the SEA for a different architecture (e.g., `linux/arm64` or `linux/amd64`), you can use the provided Docker scripts.

1.  **Build the Docker image for your target platform:**

    For `linux/arm64`:

    ```bash
    npm run build:docker:arm64
    ```

    For `linux/amd64`:

    ```bash
    npm run build:docker:amd64
    ```

2.  **Extract the executable from the Docker image:**

    After building the image, run the corresponding extraction script.

    For `linux/arm64`:

    ```bash
    npm run extract:sea:arm64
    ```

    For `linux/amd64`:

    ```bash
    npm run extract:sea:amd64
    ```

    This will copy the executable from the Docker container to your local `dist` directory, named `app-linux-arm64` or `app-linux-amd64`.

## Project Structure

```
.
├── dist/                  # Compiled output
├── scripts/               # Build scripts
│   ├── build-sea.js       # Script for building the SEA
│   └── extract-sea.sh     # Script for extracting the SEA from Docker
├── src/                   # Source code
│   └── index.ts           # Main application file
├── .dockerignore          # Files to ignore in Docker builds
├── Dockerfile             # Docker configuration
├── package.json           # Project dependencies and scripts
├── sea-config.json        # SEA configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## License

This project is licensed under the MIT License.
