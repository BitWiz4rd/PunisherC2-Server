# PunisherC2 Server

A powerful Command and Control (C2) server built with NestJS, providing a robust backend infrastructure for managing and controlling remote hosts.

## 🚀 Features

- Built with NestJS framework for scalable and maintainable code
- Support for multiple database backends (PostgreSQL and SQLite)
- RESTful API architecture
- CORS enabled for cross-origin requests
- TypeORM integration for database operations
- Scheduled tasks support
- Comprehensive testing setup with Jest

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm package manager
- PostgreSQL (if using PostgreSQL as database)
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PunisherC2.git
cd PunisherC2/server
```

2. Install dependencies:
```bash
pnpm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database configuration in `.env` file:
     ```
     DB_TYPE="postgres" # or "better-sqlite3"
     DB_HOST="your_host"
     DB_PORT=5432
     DB_USERNAME="your_username"
     DB_PASSWORD="your_password"
     DB_DATABASE="c2server"
     ```

## 🚀 Running the Application

### Development Mode
```bash
pnpm start:dev
```

### Production Mode
```bash
pnpm build
pnpm start:prod
```

The server will be running at `http://0.0.0.0:9090`

## 🧪 Testing

```bash
# Unit tests
pnpm test

# e2e tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## 📦 Available Scripts

- `pnpm build` - Build the application
- `pnpm format` - Format code with Prettier
- `pnpm start` - Start the application
- `pnpm start:dev` - Start in development mode with watch
- `pnpm start:debug` - Start in debug mode
- `pnpm start:prod` - Start in production mode
- `pnpm lint` - Lint the code
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:cov` - Run tests with coverage
- `pnpm test:debug` - Run tests in debug mode
- `pnpm test:e2e` - Run end-to-end tests

## 🏗️ Project Structure

```
server/
├── src/                    # Source files
│   ├── host/              # Host management module
│   ├── app.module.ts      # Main application module
│   ├── main.ts           # Application entry point
│   └── ...
├── test/                  # Test files
├── dist/                  # Compiled files
└── ...
```

## 🔒 Security

- Environment variables are used for sensitive configuration
- CORS is enabled for secure cross-origin requests
- Database credentials are protected through environment variables

## 📝 License

This project is licensed under the UNLICENSED license.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository.
