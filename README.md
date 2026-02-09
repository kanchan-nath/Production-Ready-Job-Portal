# Job Portal

A minimum-feature job portal application where admins can post job listings with deadline dates. Once a deadline has passed, users cannot apply for that job.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Admin Job Posting**: Admins can create job listings with title, description, company details, location, salary, and application deadline
- **Deadline Validation**: Users cannot apply for jobs after the deadline has passed
- **User Authentication**: Secure login/logout using Auth0
- **Job Listing**: View all available jobs with deadline information
- **Job Application**: Users can apply for open jobs with resume and cover letter
- **Role-Based Access**: Different permissions for admins and regular users
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **@auth0/auth0-react** - Auth0 authentication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Auth0** - Authentication & authorization
- **JWT** - Token-based authentication

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB service

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB Atlas account** (free tier available)
- **Auth0 account** (free tier available)
- **Git**

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Configure Environment Variables

#### Backend Configuration (.env)

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job_portal

# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=https://your-api-audience

# Optional
LOG_LEVEL=debug
```

#### Frontend Configuration (.env)

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
REACT_APP_AUTH0_AUDIENCE=https://your-api-audience
```

### Step 5: Set Up Auth0

1. Create an account at [https://auth0.com](https://auth0.com)
2. Create a new application (Type: Regular Web Application)
3. In Auth0 Dashboard:
   - Go to **Applications** → **Your App** → **Settings**
   - Copy your **Domain**, **Client ID**, and **Client Secret**
   - Create an **API** with identifier (this becomes your AUDIENCE)
4. Set Allowed Callback URLs:
   ```
   http://localhost:3000/callback
   http://localhost:3000
   ```
5. Set Allowed Logout URLs:
   ```
   http://localhost:3000
   ```

### Step 6: Set Up MongoDB Atlas

1. Create an account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project and cluster
3. Create a database user with username and password
4. Get your connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/job_portal
   ```
5. Whitelist your IP address in Network Access

### Step 7: Start the Application

#### Terminal 1: Start Backend

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

#### Terminal 2: Start Frontend

```bash
cd frontend
npm start
```

The frontend will open at `http://localhost:3000`

## Configuration

### Auth0 Roles & Permissions

Set up roles in Auth0 Dashboard:

1. Go to **Auth0 Dashboard** → **User Management** → **Roles**
2. Create two roles:
   - **admin**: Can post jobs, edit jobs, view all applications
   - **user**: Can view jobs and apply for them
3. Assign roles to users:
   - Go to **Users** → Select user → **Roles** tab → Add role

### MongoDB Connection

The application uses Mongoose for ODM. Update connection options in `backend/config/db.js` if needed:

```javascript
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
};
```

## Project Structure

```
job-portal/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── models/
│   │   ├── Job.js                # Job schema and model
│   │   ├── Application.js         # Application schema and model
│   │   └── User.js               # User schema and model
│   ├── routes/
│   │   ├── jobs.js               # Job-related endpoints
│   │   ├── applications.js        # Application-related endpoints
│   │   └── auth.js               # Auth-related endpoints
│   ├── middleware/
│   │   ├── auth.js               # Auth0 JWT verification
│   │   └── errorHandler.js        # Error handling middleware
│   ├── controllers/
│   │   ├── jobController.js       # Business logic for jobs
│   │   └── applicationController.js # Business logic for applications
│   ├── .env                       # Environment variables (not in repo)
│   ├── package.json
│   ├── server.js                  # Main server file
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── JobList.jsx        # Display all jobs
│   │   │   ├── JobCard.jsx        # Individual job card
│   │   │   ├── JobForm.jsx        # Admin job posting form
│   │   │   ├── ApplicationForm.jsx # Job application form
│   │   │   ├── LoginButton.jsx    # Login/logout button
│   │   │   └── ProtectedRoute.jsx # Route protection component
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Home page
│   │   │   ├── JobsPage.jsx       # Jobs listing page
│   │   │   ├── JobDetailPage.jsx  # Job details page
│   │   │   ├── AdminPanel.jsx     # Admin dashboard
│   │   │   └── CallbackPage.jsx   # Auth0 callback
│   │   ├── hooks/
│   │   │   └── useApi.js          # Custom hook for API calls
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── .env                   # Environment variables (not in repo)
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── README.md                      # This file
└── LICENSE
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require an `Authorization` header with a Bearer token from Auth0:
```
Authorization: Bearer <your-auth0-token>
```

### Jobs Endpoints

#### Get All Jobs
```http
GET /jobs
```

**Response:**
```json
[
  {
    "_id": "64a5f8c1d2e1f2g3h4i5j6k7",
    "title": "Senior Developer",
    "company": "TechCorp",
    "location": "New York, NY",
    "description": "We are looking for...",
    "salary": "$100,000 - $150,000",
    "deadline": "2024-12-31T23:59:59Z",
    "postedBy": "auth0|12345",
    "status": "open",
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T10:00:00Z"
  }
]
```

#### Get Single Job
```http
GET /jobs/:id
```

#### Post New Job (Admin Only)
```http
POST /jobs
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Senior Developer",
  "company": "TechCorp",
  "location": "New York, NY",
  "description": "We are looking for an experienced developer...",
  "salary": "$100,000 - $150,000",
  "deadline": "2024-12-31T23:59:59Z"
}
```

**Response:** (201 Created)
```json
{
  "_id": "64a5f8c1d2e1f2g3h4i5j6k7",
  "title": "Senior Developer",
  "status": "open",
  ...
}
```

#### Update Job (Admin Only)
```http
PUT /jobs/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Job (Admin Only)
```http
DELETE /jobs/:id
Authorization: Bearer <token>
```

### Applications Endpoints

#### Get User's Applications
```http
GET /applications
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "64a5f8c1d2e1f2g3h4i5j6k7a",
    "jobId": "64a5f8c1d2e1f2g3h4i5j6k7",
    "userId": "auth0|12345",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "resume": "path/to/resume.pdf",
    "coverLetter": "I am interested in...",
    "appliedAt": "2024-01-15T10:30:00Z",
    "status": "pending"
  }
]
```

#### Apply for Job
```http
POST /applications
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "jobId": "64a5f8c1d2e1f2g3h4i5j6k7",
  "resume": "path/to/resume.pdf",
  "coverLetter": "I am very interested in this position..."
}
```

**Response:** (201 Created)
```json
{
  "_id": "64a5f8c1d2e1f2g3h4i5j6k7a",
  "jobId": "64a5f8c1d2e1f2g3h4i5j6k7",
  "userId": "auth0|12345",
  "appliedAt": "2024-01-15T10:30:00Z",
  "status": "pending"
}
```

#### Get Job Applications (Admin Only)
```http
GET /admin/applications/:jobId
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "64a5f8c1d2e1f2g3h4i5j6k7a",
    "jobId": "64a5f8c1d2e1f2g3h4i5j6k7",
    "userId": "auth0|12345",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "appliedAt": "2024-01-15T10:30:00Z",
    "status": "pending"
  }
]
```

## Database Schema

### Jobs Collection

```javascript
{
  _id: ObjectId,
  title: String,              // Job title (required)
  description: String,        // Job description (required)
  company: String,            // Company name (required)
  location: String,           // Job location (required)
  salary: String,             // Salary range
  deadline: Date,             // Application deadline (required)
  postedBy: String,           // Admin ID from Auth0 (required)
  status: String,             // "open" or "closed" (default: "open")
  createdAt: Date,            // Auto-generated timestamp
  updatedAt: Date             // Auto-generated timestamp
}
```

### Applications Collection

```javascript
{
  _id: ObjectId,
  jobId: ObjectId,            // Reference to Jobs collection (required)
  userId: String,             // Auth0 user ID (required)
  userName: String,           // User's full name
  userEmail: String,          // User's email
  resume: String,             // Path/URL to resume file
  coverLetter: String,        // Cover letter text
  appliedAt: Date,            // Auto-generated timestamp
  status: String,             // "pending", "accepted", "rejected"
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection (Optional)

```javascript
{
  _id: String,                // Auth0 user ID
  email: String,              // User email (required, unique)
  name: String,               // User full name
  role: String,               // "admin" or "user"
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication

### How Auth0 Works

1. **User Login**: User clicks "Log In" button
2. **Redirect to Auth0**: User is redirected to Auth0 login page
3. **Auth0 Authentication**: User enters credentials
4. **Redirect Back**: Auth0 redirects back to your app with tokens
5. **Token Storage**: Token is stored in browser memory/local storage
6. **API Requests**: Token is sent in `Authorization` header for protected API calls

### Frontend Authentication Flow

```javascript
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    const token = await getAccessTokenSilently();
    const response = await axios.get('/api/jobs', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  };

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    <div>Welcome, {user.name}</div>
  ) : (
    <LoginButton />
  );
}
```

### Backend Token Validation

```javascript
const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256'
});

// Protect routes with middleware
app.post('/api/jobs', checkJwt, (req, res) => {
  // User is authenticated
  // req.auth contains decoded token
  // req.auth.sub contains Auth0 user ID
});
```

## Key Features Explained

### Deadline Validation

The core feature prevents applications after deadline:

**Frontend:**
```javascript
const isDeadlinePassed = new Date() > new Date(job.deadline);

<button disabled={isDeadlinePassed}>
  {isDeadlinePassed ? "Deadline Passed" : "Apply Now"}
</button>
```

**Backend:**
```javascript
const job = await Job.findById(jobId);
if (new Date() > new Date(job.deadline)) {
  return res.status(400).json({
    error: "Application deadline has passed"
  });
}
```

### Role-Based Access Control

**Admin Features:**
- Post new jobs
- Edit/delete jobs
- View all applications for their jobs

**User Features:**
- View all open jobs
- Apply for jobs (if deadline is valid)
- View their own applications

## Deployment

### Deploy Backend to Heroku

```bash
cd backend
heroku login
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=<your-connection-string>
heroku config:set AUTH0_DOMAIN=<your-auth0-domain>
# ... set other environment variables
```

### Deploy Frontend to Vercel

```bash
cd frontend
npm install -g vercel
vercel
# Follow prompts to deploy
```

Update the `REACT_APP_API_URL` in Vercel environment variables to point to your Heroku backend.

### Deploy to AWS/Azure

Follow respective platform documentation for Node.js and React deployment.

## Environment Variables

### Important Security Notes

- **Never commit `.env` files to version control**
- Add `.env` to `.gitignore`
- Use strong, unique passwords for MongoDB and Auth0
- Rotate secrets regularly
- Use environment-specific values for different deployment stages

## Troubleshooting

### Issue: "Deadline Passed" but users can still apply

**Solution:** Verify that both frontend and backend validate deadlines. Check system time on server.

```bash
# Check server time
date
```

### Issue: Auth0 token not validating

**Solution:** 
- Verify `AUTH0_AUDIENCE` matches your Auth0 API audience
- Check that token is included in request header
- Ensure token hasn't expired

```javascript
// Verify token in header
const token = req.headers.authorization?.split(' ')[1];
console.log(token);
```

### Issue: MongoDB connection failing

**Solution:**
- Verify connection string format
- Check IP address is whitelisted in MongoDB Atlas
- Ensure username/password are URL-encoded if they contain special characters

```javascript
// URL encode special characters
const username = encodeURIComponent('user@email.com');
```

### Issue: CORS errors

**Solution:** Add proper CORS configuration in backend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Issue: "Cannot find module" errors

**Solution:** Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Auth0 callback not working

**Solution:** Verify callback URLs in Auth0 dashboard match your application:
- Development: `http://localhost:3000/callback`
- Production: `https://yourdomain.com/callback`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## Future Enhancements

- [ ] Email notifications for applications
- [ ] Job search and filtering
- [ ] Save/bookmark jobs
- [ ] Admin dashboard with analytics
- [ ] Applicant rating system
- [ ] Job category/tags
- [ ] Advanced filtering (salary range, experience level)
- [ ] Application status updates via email
- [ ] User profile and resume storage
- [ ] PDF resume parsing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@jobportal.com or open an issue in the repository.

## Authors

- **Your Name** - *Initial work* - [GitHub](https://github.com/yourusername)

## Acknowledgments

- Auth0 for authentication services
- MongoDB for database
- Express.js community
- React community
