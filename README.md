
# MERN Notes App — Backend API

A secure RESTful API for a Notes Management application built with Node.js, Express.js, and MongoDB. The API supports authentication, note management, role-based access control, AI-powered note assistance, and admin operations.

## 🚀 Live Demo

- **Live API:** https://mern-notes-backend-nxy7.onrender.com/
- **API Documentation (Swagger):** https://mern-notes-backend-nxy7.onrender.com/api-docs
- **Health Check:** https://mern-notes-backend-nxy7.onrender.com/health

## ✨ Features

### Authentication & Authorization
- User registration, login, and logout
- Password hashing with bcrypt
- JWT authentication using secure HTTP-only cookies and Bearer tokens
- Role-based access control for users and administrators
- Protected routes and ownership checks

### Notes Management
- Create, retrieve, update, and delete notes
- Search and filter notes
- Filter by category, tags, and pinned status
- Pin and unpin notes
- Pagination for efficient data retrieval
- User-specific notes with admin access controls

### AI-Powered Features
- AI-assisted note suggestions, including categories and tags
- Improve note content and writing
- Summarize notes
- Generate action items from notes
- Rate limiting for AI requests

### Admin Features
- Manage and retrieve user information
- Retrieve notes across users
- Restrict administrative operations by role

### Security & Reliability
- Centralized error handling
- Request validation with express-validator
- Helmet security headers
- NoSQL injection protection
- Authentication rate limiting
- CORS configuration
- Environment variable validation
- Automated health-check and test setup

### API Documentation & Testing
- Interactive Swagger/OpenAPI documentation
- Jest testing
- Supertest for HTTP endpoint testing

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**AI:** Google Gemini API (`@google/genai`)  
**Security:** Helmet, CORS, express-mongo-sanitize, express-validator  
**Testing:** Jest, Supertest  
**Documentation:** Swagger / OpenAPI  
**Deployment:** Render, MongoDB Atlas

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Google Gemini API key for AI features

### 1. Clone the repository

```bash
git clone https://github.com/Bhranti0302/mern-notes-backend.git
cd mern-notes-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
GEMINI_API_KEY=your_gemini_api_key
TEST_MONGO_URI=your_separate_test_database_connection_string
```

Keep your `.env` file private. Never commit API keys, database credentials, or JWT secrets to GitHub.

Use a separate MongoDB database for automated tests.

### 4. Start the development server

```bash
npm start
```

The API should run at:

`http://localhost:5000`

### 5. Verify the API

- Health check: `http://localhost:5000/health`
- Swagger docs: `http://localhost:5000/api-docs`

## 📚 API Endpoints

The following are the main endpoint groups. Open the live Swagger documentation for the complete list of routes, request bodies, authentication requirements, and response schemas.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/user/...` | User-related operations |
| GET, POST | `/api/note` | Retrieve or create notes |
| PATCH, DELETE | `/api/note/:id` | Update or delete a note |
| POST | `/api/ai/suggest` | Generate AI note suggestions |
| POST | `/api/ai/summarize/:noteId` | Summarize a note |
| POST | `/api/ai/improve/:noteId` | Improve note content |
| POST | `/api/ai/action-items/:noteId` | Generate action items |
| GET | `/health` | Check API health |

> Note: Exact methods and authorization requirements for individual endpoints are documented in Swagger.

## 🧪 Testing

Run the automated tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Configure `TEST_MONGO_URI` to use a dedicated test database before running the test suite.

## 🌐 Deployment

This project is deployed on Render and uses MongoDB Atlas for database hosting.

To deploy your own instance:

1. Push the project to GitHub.
2. Create a new **Web Service** on Render.
3. Connect your repository.
4. Set the build command to `npm install`.
5. Set the start command to `npm start`.
6. Configure the required environment variables in Render.
7. Deploy and verify `/health` and `/api-docs`.

## 🔐 Authentication

Protected endpoints require valid authentication using the configured JWT cookie or Bearer token, depending on the request and endpoint.

For Bearer authentication, use the following header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Use the **Authorize** option in Swagger when testing endpoints that require a Bearer token.

## 👩‍💻 Author

**Bhranti Tamboli**

- GitHub: [Bhranti0302](https://github.com/Bhranti0302)
- LinkedIn: [Bhranti Tamboli](https://linkedin.com/in/bhranti-tamboli)
- Portfolio: [View Portfolio](https://bhranti-tamboli-portfolio.netlify.app)

---

If you find this project useful, consider giving the repository a star.
