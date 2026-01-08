import { Router, Response } from 'express';
import { prisma } from '../server.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { optionalAuth, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all exercises (public endpoint)
router.get('/', optionalAuth, asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query?.page as string) || 1;
  const limit = parseInt(req.query?.limit as string) || 50;
  const skip = (page - 1) * limit;
  const category = req.query?.category as string;
  const muscleGroup = req.query?.muscleGroup as string;
  const search = req.query?.search as string;

  const where: any = {};
  
  if (category) {
    where.category = category.toUpperCase();
  }
  
  if (muscleGroup) {
    where.muscleGroups = {
      has: muscleGroup.toUpperCase(),
    };
  }
  
  if (search) {
    where.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  const [exercises, total] = await Promise.all([
    prisma.exercise.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    }),
    prisma.exercise.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      exercises,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
}));

// Get exercise by ID
router.get('/:id', optionalAuth, asyncHandler(async (req: AuthRequest, res: Response) => {
  const exercise = await prisma.exercise.findUnique({
    where: { id: req.params?.id },
  });

  if (!exercise) {
    throw createError('Exercise not found', 404);
  }

  res.json({
    success: true,
    data: { exercise },
  });
}));

// Get exercise categories
router.get('/categories/list', asyncHandler(async (req: any, res: Response) => {
  const categories = Object.values([
    'STRENGTH', 'CARDIO', 'FLEXIBILITY', 'BALANCE', 'FUNCTIONAL', 'SPORTS_SPECIFIC'
  ]);

  res.json({
    success: true,
    data: { categories },
  });
}));

// Get muscle groups
router.get('/muscle-groups/list', asyncHandler(async (req: any, res: Response) => {
  const muscleGroups = Object.values([
    'CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'LEGS', 
    'GLUTES', 'CORE', 'CALVES', 'FOREARMS', 'TRAPS', 'LATS'
  ]);

  res.json({
    success: true,
    data: { muscleGroups },
  });
}));

export { router as exerciseRoutes };
