# YFK Courier Apps Web

A modern courier management web application built with Next.js 15, designed for YellowFit Courier services. This Progressive Web App (PWA) provides an intuitive interface for managing courier operations with real-time updates and mobile-first design.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 and React 19
- **Progressive Web App**: Installable PWA with offline capabilities
- **Responsive Design**: Mobile-first approach with Tailwind CSS and DaisyUI
- **Smooth Animations**: Enhanced UX with Framer Motion
- **Type Safety**: Full TypeScript support
- **Docker Ready**: Containerized deployment with multi-stage builds
- **Performance Optimized**: Turbopack for faster development

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18 or higher
- npm, yarn, pnpm, or bun
- Docker and Docker Compose (for containerized deployment)

## 🛠️ Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/iqbaalynsyh234/yellowfit-courier.git
   cd yellowfit-courier
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration values.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Docker Development

1. **Using Docker Compose (Recommended)**
   ```bash
   docker-compose up --build
   ```

2. **Using Docker directly**
   ```bash
   docker build -t yfk-courier-web .
   docker run -p 3000:3000 yfk-courier-web
   ```

## 📦 Package.json Overview

The project uses the following key dependencies:

### Core Dependencies
- **Next.js 15.3.4**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Type safety and better developer experience

### UI & Styling
- **Tailwind CSS 4.1.11**: Utility-first CSS framework
- **DaisyUI 5.0.43**: Component library for Tailwind CSS
- **Framer Motion 12.19.2**: Animation library
- **React Icons 5.5.0**: Icon library

### Utilities
- **Axios 1.10.0**: HTTP client for API requests
- **date-fns 4.1.0**: Date utility library
- **next-pwa 5.6.0**: PWA functionality

### Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🐳 Docker Configuration

### Dockerfile

The project uses a multi-stage Docker build for optimization:

1. **Dependencies Stage**: Installs production dependencies
2. **Builder Stage**: Builds the Next.js application
3. **Runner Stage**: Creates the final lightweight image

**Key Features:**
- Multi-stage build for smaller image size
- Non-root user for security
- Optimized for production deployment
- Standalone output for better performance

### Docker Compose

The `docker-compose.yml` provides:

- **Development Environment**: Hot reload with volume mounting
- **Health Checks**: Automatic service health monitoring
- **Network Configuration**: Custom bridge network
- **Environment Management**: Support for `.env` files
- **Auto Restart**: Service restart on failure

**Services:**
- **web**: Main application service on port 3000
- **Network**: Custom bridge network `yfk-courier-network`

## 🚀 setup docker and running how to : 

### Production Build

```bash
npm run build
npm run start
```

### Docker Production

```bash
# Build production imagee
docker build -t yfk-courier-web:latest .

# Run docker container
docker-compose -f docker-compose.dev.yml up --build


#Docker Running Compose and server stop to bash :
docker-compose -f docker-compose.dev.yml start

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_URL=your_api_url_here
API_SECRET_KEY=your_secret_key_here

# Database (if applicable)
DATABASE_URL=your_database_url_here

# Other configurations
NEXT_TELEMETRY_DISABLED=1
```

## 📱 PWA Features Nextjs

This application is configured as a Progressive Web App with:

- **Offline Support**: Service worker for offline functionality
- **Installable**: Can be installed on mobile devices
- **App-like Experience**: Native app feel on mobile
- **Push Notifications**: Support for push notifications (if configured)

## 🏗️ Project Structure

```
yellowfit-courier/
├── app/                    # Next.js App Router
├── components/             # Reusable components
├── public/                 # Static assets
├── styles/                 # Global styles
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── .env                    # Environment variables
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔍 Health Checks

The application includes health check endpoints:

- **Docker Health Check**: Automated health monitoring
- **Endpoint**: `http://localhost:3000/api/health` (if implemented)
- **Monitoring**: 30-second intervals with 3 retries

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to YellowFit Courier services.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v0.1.0**: Initial release with basic courier management features

---
