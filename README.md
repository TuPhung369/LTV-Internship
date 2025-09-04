# LTV Employee Profile Management System

A comprehensive employee profile management system built with Vue.js frontend and Node.js backend.

## 🚀 Project Structure

```
LTV-Internship/
├── BackVueJS/
│   └── employee-profile-backend/    # Node.js Backend (Moleculer.js)
└── FrontVueJS/
    └── employee-profile-frontend/   # Vue.js Frontend
```

## 🛠️ Technologies Used

### Backend

- **Framework**: Node.js with Moleculer.js microservices
- **Database**: MongoDB Atlas
- **ORM**: Prisma
- **Authentication**: Firebase Admin SDK
- **API Gateway**: Moleculer Web
- **Language**: TypeScript

### Frontend

- **Framework**: Vue.js 3
- **Build Tool**: Vite
- **UI Library**: Element Plus
- **State Management**: Pinia
- **Routing**: Vue Router
- **Language**: TypeScript

## 🔧 Features

### Backend Services

- ✅ **Device Management**: Register and manage user devices
- ✅ **User Authentication**: Firebase-based authentication
- ✅ **Employee Profiles**: Complete employee information management
- ✅ **Departments & Positions**: Organizational structure management
- ✅ **Skills & Qualifications**: Employee capabilities tracking
- ✅ **Work History**: Career progression tracking
- ✅ **Push Notifications**: Real-time notifications
- ✅ **VCard Generation**: Digital business cards

### Frontend Features

- 🔄 **Responsive Design**: Mobile-first approach
- 🔄 **Real-time Updates**: Live data synchronization
- 🔄 **User Dashboard**: Comprehensive employee portal
- 🔄 **Admin Panel**: Management interface
- 🔄 **Profile Management**: Self-service profile updates

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- MongoDB Atlas account
- Firebase project

### Backend Setup

1. Navigate to backend directory:

```bash
cd BackVueJS/employee-profile-backend
```

2. Install dependencies:

```bash
yarn install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start the development server:

```bash
yarn serve
```

The backend will be available at `http://localhost:4000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd FrontVueJS/employee-profile-frontend
```

2. Install dependencies:

```bash
yarn install
```

3. Configure environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
yarn dev
```

The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Device Management

- `POST /api/devices` - Register a new device
- `GET /api/devices` - Get user devices (authenticated)
- `DELETE /api/devices` - Remove device (authenticated)

### Authentication

- `POST /api/accounts/login` - User login

### Employee Management

- `GET /api/accounts/users` - Get all users
- `GET /api/accounts/users/me` - Get current user profile
- `PATCH /api/accounts/users` - Update user profile

### Organizational Data

- `GET /api/departments` - Get all departments
- `GET /api/positions` - Get all positions
- `GET /api/skills` - Get all skills
- `GET /api/qualifications` - Get all qualifications

## 🔒 Environment Variables

### Backend (.env)

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
PORT=4000
```

### Frontend (.env)

```env
VITE_API_BASE_URL="http://localhost:4000/api"
VITE_FIREBASE_API_KEY="your-firebase-api-key"
VITE_FIREBASE_PROJECT_ID="your-firebase-project-id"
```

## 🧪 Testing

### Backend Testing

```bash
cd BackVueJS/employee-profile-backend
yarn test
```

### Frontend Testing

```bash
cd FrontVueJS/employee-profile-frontend
yarn test
```

## 📦 Deployment

### Backend Deployment

- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Ensure MongoDB Atlas is accessible
- Configure production environment variables

### Frontend Deployment

- Build for production: `yarn build`
- Deploy to Netlify, Vercel, or similar platforms
- Configure production API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tu Phung** - [GitHub](https://github.com/TuPhung369)

## 🙏 Acknowledgments

- LTV Company for the internship opportunity
- Vue.js and Node.js communities
- All contributors and supporters

---

⭐ **Star this repository if you find it helpful!**
