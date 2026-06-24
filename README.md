# 🚀 Full Stack Web Application

A modern, production-ready full stack application built with **React + Vite** (frontend) and **Node.js + Express** (backend).

## 📁 Project Structure

```
fullstack-app/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── main.jsx         # Entry point
│   │   ├── App.jsx          # Main app component
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Route controllers
│   │   └── models/          # Data models
│   ├── server.js            # Server entry point
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   └── package.json         # Backend dependencies
│
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Access the App
Open your browser and go to: `http://localhost:5173`

## 📦 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start server with auto-reload
- `npm start` - Start server normally
- `npm test` - Run tests (if configured)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hello` | Test endpoint |
| GET | `/api/data` | Get sample data |
| POST | `/api/submit` | Submit data |
| GET | `/health` | Health check |

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **dotenv** - Environment config
- **Node.js** - Runtime

## 📝 Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🚀 Production Build

### Frontend Build
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Backend Deployment
```bash
cd backend
npm install --production
npm start
```

## 🐛 Troubleshooting

**CORS Error?**
- Make sure backend is running on port 5000
- Check frontend proxy in `vite.config.js`

**Port Already in Use?**
- Frontend: Change port in `vite.config.js`
- Backend: Change PORT in `.env` file

**Module Not Found?**
- Delete `node_modules` and reinstall: `npm install`

## 📚 Next Steps

1. **Database Integration** - Add MongoDB, PostgreSQL, or Firebase
2. **Authentication** - Implement JWT or OAuth
3. **State Management** - Add Redux or Zustand
4. **Testing** - Set up Jest and React Testing Library
5. **Deployment** - Deploy to Vercel, Heroku, or AWS

## 🐍 Python Backend (optional)

A minimal FastAPI backend is included in `backend-python/` if you prefer Python instead of Node.

Quick start (Windows PowerShell):

```powershell
cd backend-python
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The Python backend exposes the same endpoints as the Node backend under `/api/*` and runs by default on `http://localhost:8000`.

## 📄 License

MIT License - Feel free to use this as a starter template!

---

**Happy Coding! 🎉**
# project-AI
# project-AI
# project-AI
# project-AI
