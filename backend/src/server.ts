import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.js';
import { preorderRoutes } from './routes/preorder.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Simple auth endpoints for demo
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  
  // Simple validation
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      message: 'Email, password, and name are required'
    });
  }

  // Mock user creation
  const mockUser = {
    id: 'user_' + Date.now(),
    email,
    name,
    createdAt: new Date().toISOString()
  };

  const mockToken = 'mock_jwt_token_' + Date.now();

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: mockUser,
      token: mockToken
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Mock login - accept any email/password for demo
  const mockUser = {
    id: 'user_demo',
    email,
    name: email.split('@')[0],
    createdAt: new Date().toISOString()
  };

  const mockToken = 'mock_jwt_token_' + Date.now();

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: mockUser,
      token: mockToken
    }
  });
});

app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }

  // Mock profile
  res.json({
    success: true,
    data: {
      user: {
        id: 'user_demo',
        email: 'demo@gainfitness.com',
        name: 'Demo User',
        age: 25,
        weight: 75,
        height: 175,
        gender: 'MALE',
        activityLevel: 'MODERATELY_ACTIVE',
        createdAt: new Date().toISOString()
      }
    }
  });
});

// Mock exercise data
app.get('/api/exercises', (req, res) => {
  const exercises = [
    {
      id: '1',
      name: 'Bench Press',
      category: 'STRENGTH',
      muscleGroups: ['CHEST', 'TRICEPS', 'SHOULDERS'],
      difficulty: 'INTERMEDIATE',
      equipment: 'Barbell',
      instructions: 'Lie on bench, grip bar slightly wider than shoulder-width, lower to chest, press up'
    },
    {
      id: '2',
      name: 'Squats',
      category: 'STRENGTH',
      muscleGroups: ['LEGS', 'GLUTES', 'CORE'],
      difficulty: 'INTERMEDIATE',
      equipment: 'Barbell',
      instructions: 'Stand with bar on shoulders, squat to parallel, stand up'
    },
    {
      id: '3',
      name: 'Deadlifts',
      category: 'STRENGTH',
      muscleGroups: ['BACK', 'LEGS', 'GLUTES', 'CORE'],
      difficulty: 'ADVANCED',
      equipment: 'Barbell',
      instructions: 'Stand with bar over feet, bend knees, grip bar, stand up straight'
    },
    {
      id: '4',
      name: 'Pull-ups',
      category: 'STRENGTH',
      muscleGroups: ['BACK', 'BICEPS'],
      difficulty: 'INTERMEDIATE',
      equipment: 'Pull-up bar',
      instructions: 'Hang from bar, pull chin over bar, lower slowly'
    },
    {
      id: '5',
      name: 'Running',
      category: 'CARDIO',
      muscleGroups: ['LEGS', 'CORE'],
      difficulty: 'BEGINNER',
      equipment: 'Treadmill/Outdoor',
      instructions: 'Run at steady pace for desired duration'
    }
  ];

  res.json({
    success: true,
    data: {
      exercises,
      pagination: {
        page: 1,
        limit: 50,
        total: exercises.length,
        pages: 1
      }
    }
  });
});

app.get('/api/exercises/categories/list', (req, res) => {
  const categories = ['STRENGTH', 'CARDIO', 'FLEXIBILITY', 'BALANCE', 'FUNCTIONAL'];
  
  res.json({
    success: true,
    data: { categories }
  });
});

app.get('/api/exercises/muscle-groups/list', (req, res) => {
  const muscleGroups = ['CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'LEGS', 'GLUTES', 'CORE'];
  
  res.json({
    success: true,
    data: { muscleGroups }
  });
});

// Mock workout endpoints
app.get('/api/workouts', (req, res) => {
  res.json({
    success: true,
    data: {
      workouts: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    }
  });
});

app.post('/api/workouts', (req, res) => {
  const workout = req.body;
  
  res.status(201).json({
    success: true,
    message: 'Workout created successfully',
    data: {
      workout: {
        id: 'workout_' + Date.now(),
        ...workout,
        createdAt: new Date().toISOString()
      }
    }
  });
});

// Mock analytics endpoints
app.get('/api/analytics/progress', (req, res) => {
  res.json({
    success: true,
    data: {
      period: '30 days',
      totalWorkouts: 0,
      totalVolume: 0,
      totalDuration: 0,
      avgDuration: 0,
      workouts: []
    }
  });
});

app.get('/api/analytics/fatigue', (req, res) => {
  res.json({
    success: true,
    data: {
      period: '7 days',
      fatigueScore: 25,
      recentVolume: 0,
      avgSleep: 7.5,
      workouts: [],
      recoveryData: []
    }
  });
});

// Mock AI endpoints
app.get('/api/ai/workout-suggestion', (req, res) => {
  const { focusArea, duration = 60 } = req.query;
  
  const suggestion = {
    duration: parseInt(duration as string),
    exercises: [
      {
        exercise: {
          id: '1',
          name: focusArea ? `${focusArea} Exercise 1` : 'Bench Press',
          category: 'STRENGTH'
        },
        suggestedSets: 3,
        suggestedReps: '8-12',
        suggestedRest: 60,
        order: 1
      },
      {
        exercise: {
          id: '2',
          name: focusArea ? `${focusArea} Exercise 2` : 'Squats',
          category: 'STRENGTH'
        },
        suggestedSets: 3,
        suggestedReps: '8-12',
        suggestedRest: 60,
        order: 2
      }
    ],
    notes: `AI-generated ${focusArea || 'full body'} workout based on your recent activity`
  };

  res.json({
    success: true,
    data: {
      suggestion,
      recentWorkoutsCount: 0
    }
  });
});

app.get('/api/ai/readiness-score', (req, res) => {
  const readinessScore = 85;
  
  res.json({
    success: true,
    data: {
      readinessScore,
      recommendation: readinessScore >= 80 ? 'Ready for intense training' :
                    readinessScore >= 60 ? 'Moderate training recommended' :
                    readinessScore >= 40 ? 'Light training or rest' :
                    'Rest day recommended',
      factors: {
        recentWorkouts: 0,
        recoveryData: true
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/preorder', preorderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
