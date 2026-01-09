## Live Application URL

URL: https://d3im70g458lr23.cloudfront.net/

---

## Team Member Contributions

Team members:
- Ayman Fouda - 220218320
- Salah Al Baik - 220218371
- Yousef Kitaz - 220218340
- Abdullah Al-salami - 220218449

All team members worked collaboratively on the design and development of this project. The team jointly participated in system planning, architectural design, and discussions around technology choices. Implementation tasks, documentation, testing, and deployment were completed through continuous collaboration and knowledge sharing.

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm
- Git

### Clone the Repository

```bash
git clone https://github.com/AymanAFouda/library-recommendation-system.git
cd library-recommendation-system
```

### install dependencies

```bash
npm install
```

### Environment Configuration

create a .env file and provide the required environment variables:

- VITE_API_BASE_URL=http://api-url/api
- VITE_AWS_REGION=us-east-1
- VITE_COGNITO_USER_POOL_ID=your-user-pool-id
- VITE_COGNITO_CLIENT_ID=your-client-id

### Run the Application

```bash
npm run dev
```

The application will be available at: http://localhost:5173

---

## API Endpoints Documentation

Library Management System – API Documentation

Base URL:
https://ed4n9ey4s8.execute-api.us-east-1.amazonaws.com/dev

Protocol: HTTPS

Authentication: Amazon Cognito User Pools (JWT in Authorization header)

Data Format: JSON

Architecture: Serverless (API Gateway + Lambda proxy integration)

## Authentication & Authorization

Most write and user-specific endpoints are protected using a Cognito User Pool Authorizer.

The client must send a valid JWT access token in the HTTP header:

Authorization: Bearer <JWT_TOKEN>

Public endpoints (e.g. retrieving books) do not require authentication.

Admin-only actions (creating/deleting books) require authenticated 
users with elevated permissions (handled via Cognito).

## API Endpoints

### Books API

**Get All Books**

Endpoint: GET /books

Description: Retrieves a list of all books available in the library.

Authentication: Not required.

Response (200 OK): Returns a JSON array of book objects.

**Create a Book (Admin Only)**

Endpoint: POST /books

Description: Creates a new book entry in the system. 
This endpoint is restricted to authenticated admin users.

Authentication: Required (Cognito).

Request Body (JSON):

{
  "title": "string",
  "author": "string",
  "genre": "string",
  "description": "string",
  "coverImage": "string",
  "rating": number,
  "publishedYear": number,
  "isbn": "string"
}

Response (201 Created): Returns the created book object, including a generated id.

**Get Book by ID**

Endpoint: GET /books/{id}

Description: Retrieves details of a single book using its unique identifier.

Path Parameters: id (string) – Book ID

Authentication: Not required.

Response (200 OK): Returns a JSON object representing the book.

Error Responses: 404 Not Found – Book does not exist

**Delete Book (Admin Only)**

Endpoint: DELETE /books/{id}

Description: Deletes a book from the system by its ID.

Path Parameters: id (string) – Book ID

Authentication: Required (Cognito).

Response: 204 No Content – Book deleted successfully

### Reading Lists API

**Get User Reading Lists**

Endpoint: GET /reading-lists

Description: Retrieves all reading lists belonging to the authenticated user.

Authentication: Required (Cognito).

Response (200 OK): Returns a JSON array of reading lists.

**Create Reading List**

Endpoint: POST /reading-lists

Description: Creates a new reading list for the authenticated user.

Authentication: Required (Cognito).

Request Body (JSON):

{
  "name": "string",
  "description": "string",
  "bookIds": ["string"]
}

Response (201 Created): Returns the newly created reading list object.

**Update Reading List**

Endpoint: PUT /reading-lists/{id}

Description: Updates an existing reading list. 
Only allowed fields (name, description, bookIds) can be modified.

Path Parameters: id (string) – Reading list ID

Authentication: Required (Cognito).

Request Body (JSON – partial allowed):

{
  "name": "string",
  "description": "string",
  "bookIds": ["string"]
}

Response (200 OK): Returns the updated reading list object.

**Delete Reading List**

Endpoint: DELETE /reading-lists/{id}

Description: Deletes a reading list belonging to the authenticated user.

Path Parameters: id (string) – Reading list ID

Authentication: Required (Cognito).

Response (200 OK)

{
  "message": "Reading list deleted successfully"
}

### Recommendations API

**Get Book Recommendations**

Endpoint: POST /recommendations

Description: Returns personalized book recommendations for the authenticated user.

Authentication: Required (Cognito).

Response (200 OK): Returns a list of recommended books.

## CORS Support

All endpoints support Cross-Origin Resource Sharing (CORS) with:

Access-Control-Allow-Origin: *

Access-Control-Allow-Methods configured per resource

OPTIONS preflight requests enabled

## Security & Transport

TLS Policy: TLS 1.3

Authorization: JWT via Cognito User Pools

Backend Integration: AWS Lambda (proxy integration)

---

# Library Recommendation System

An AI-powered library book recommendation system built with React, TypeScript, Tailwind CSS, and AWS serverless architecture. This is a 4-week intensive project for CENG413 Software Quality Standards course.

---

## 🎯 Project Overview

This project provides a **complete frontend starter** with mock data and comprehensive guides for students to implement the AWS serverless backend. Students will learn:

- Modern React development with TypeScript
- AWS Lambda, DynamoDB, API Gateway
- User authentication with Amazon Cognito
- AI integration with Amazon Bedrock
- Serverless architecture patterns
- Cloud deployment (S3 + CloudFront)

**Current Status**: ✅ Frontend complete | Backend complete

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS
- **AI-Powered Recommendations**: Integration-ready for Amazon Bedrock
- **User Authentication**: Prepared for AWS Cognito integration
- **Reading Lists**: Organize and manage book collections
- **Admin Dashboard**: Book management and metrics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript coverage
- **Testing**: Vitest + React Testing Library setup
- **Code Quality**: ESLint, Prettier, and strict TypeScript configuration

---

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Check code quality
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── book-covers/          # Book cover images
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── books/            # Book-specific components
│   │       ├── BookCard.tsx
│   │       ├── BookGrid.tsx
│   │       └── BookSearch.tsx
│   ├── pages/                # Page components
│   │   ├── Home.tsx
│   │   ├── Books.tsx
│   │   ├── BookDetail.tsx
│   │   ├── Recommendations.tsx
│   │   ├── ReadingLists.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Admin.tsx
│   │   └── NotFound.tsx
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/                # Custom hooks
│   │   └── useAuth.ts
│   ├── services/             # API and data services
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   ├── formatters.ts
│   │   ├── validation.ts
│   │   └── errorHandling.ts
│   ├── tests/                # Test files
│   │   ├── components/
│   │   ├── utils/
│   │   └── setup.ts
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── .vscode/                  # VS Code settings
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

- Strict mode enabled
- Path aliases configured (`@/` → `src/`)
- React JSX support

### Vite (`vite.config.ts`)

- Path alias resolution
- Dev server on port 5173
- Optimized production builds
- Code splitting for vendor libraries

### Tailwind CSS (`tailwind.config.js`)

- Custom color palette (primary shades)
- Custom animations (fade-in, slide-up)
- Responsive breakpoints

### ESLint & Prettier

- React and TypeScript rules
- Automatic formatting on save
- Import sorting

## 🎨 UI Components

### Common Components

- **Button**: Variants (primary, secondary, danger), sizes (sm, md, lg)
- **Card**: Hoverable cards with shadow effects
- **Input**: Form inputs with validation and error display
- **Modal**: Accessible modal with backdrop and ESC key support
- **LoadingSpinner**: Animated loading indicator
- **ProtectedRoute**: Route wrapper for authentication

### Layout Components

- **Header**: Responsive navigation with mobile menu
- **Footer**: Copyright and social links
- **Navigation**: Active link styling with React Router

### Book Components

- **BookCard**: Book display with cover, title, author, rating
- **BookGrid**: Responsive grid layout for books
- **BookSearch**: Search and filter interface

---

## 🔐 Authentication

The app uses AWS Cognito for authentication.

---

## 🤖 AI Recommendations

The Recommendations page uses Amazon Bedrock to get book recommendations based on the user query.
An open-source AI model hub: Hugging Face, is used as a fallback Ai model if Amazon Bedrock didn't work or the website exceded the free-tier account available tokens.

**Estimated Cost**: ~$0.01 per recommendation (within Free Tier for testing)

---

## 📚 Project Documentation

### For Students

- **[README.md](./README.md)** - This file - Quick start guide (START HERE!)
- **[AWS_FREE_TIER_SETUP.md](../AWS_FREE_TIER_SETUP.md)** - AWS account creation guide (root directory)
- **[PROJECT_TIMELINE_4WEEKS.md](../PROJECT_TIMELINE_4WEEKS.md)** - Weekly goals and timeline (root directory)
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Step-by-step AWS implementation
- **[STUDENT_CHECKLIST.md](./STUDENT_CHECKLIST.md)** - Progress tracking checklist
- **[RESOURCES.md](./RESOURCES.md)** - All official documentation links

### External Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [AWS Lambda Guide](https://docs.aws.amazon.com/lambda/)
- [DynamoDB Guide](https://docs.aws.amazon.com/dynamodb/)
- [Cognito Guide](https://docs.aws.amazon.com/cognito/)
- [Bedrock Guide](https://docs.aws.amazon.com/bedrock/)

---

## 🎓 Learning Objectives

By completing this project, students will:

- ✅ Build production-ready React applications with TypeScript
- ✅ Implement serverless architecture with AWS Lambda
- ✅ Design NoSQL databases with DynamoDB
- ✅ Secure applications with Cognito authentication
- ✅ Integrate AI/ML services with Amazon Bedrock
- ✅ Deploy full-stack applications to AWS
- ✅ Follow software quality standards and best practices
- ✅ Work in agile teams with version control

---

## 🤝 Contributing

This is a student project for CENG413 Software Quality Standards course. Follow the project guidelines and coding standards defined in `.kiro/steering/` files.

---

## 📄 License

This project is part of an academic course at Istanbul Okan University.

---

**Built with ❤️ for CENG413 - Software Quality Standards**

**Project Type**: 4-week intensive, beginner-friendly, AWS serverless  
**Status**: Frontend complete ✅ | Backend implementation guides ready ✅  
**Next Step**: [QUICK_START.md](./QUICK_START.md) 🚀
