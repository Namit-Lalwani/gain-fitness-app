import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

const workoutSchema = z.object({
  date: z.string().datetime(),
  duration: z.number().min(1),
  notes: z.string().optional(),
  exercises: z.array(z.object({
    exerciseId: z.string(),
    order: z.number().min(1),
    notes: z.string().optional(),
    sets: z.array(z.object({
      setNumber: z.number().min(1),
      reps: z.number().min(1),
      weight: z.number().min(0),
      rpe: z.number().min(1).max(10).optional(),
      rir: z.number().min(0).max(10).optional(),
      restTime: z.number().min(0).optional(),
    })),
  })),
});

// Get all workouts for user
router.get('/', asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const [workouts, total] = await Promise.all([
    prisma.workout.findMany({
      where: { userId: req.user!.id },
      include: {
        exercises: {
          include: {
            exercise: true,
            sets: true,
          },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { date: 'desc' },
      skip,
      take: limit,
    }),
    prisma.workout.count({
      where: { userId: req.user!.id },
    }),
  ]);

  res.json({
    success: true,
    data: {
      workouts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
}));

// Get single workout
router.get('/:id', asyncHandler(async (req: AuthRequest, res: Response) => {
  const workout = await prisma.workout.findFirst({
    where: { 
      id: req.params.id,
      userId: req.user!.id,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: {
            orderBy: { setNumber: 'asc' },
          },
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!workout) {
    throw createError('Workout not found', 404);
  }

  res.json({
    success: true,
    data: { workout },
  });
}));

// Create workout
router.post('/', asyncHandler(async (req: AuthRequest, res: Response) => {
  const validatedData = workoutSchema.parse(req.body);

  const workout = await prisma.workout.create({
    data: {
      userId: req.user!.id,
      date: new Date(validatedData.date),
      duration: validatedData.duration,
      notes: validatedData.notes,
      exercises: {
        create: validatedData.exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          order: exercise.order,
          notes: exercise.notes,
          sets: {
            create: exercise.sets.map((set) => ({
              setNumber: set.setNumber,
              reps: set.reps,
              weight: set.weight,
              rpe: set.rpe,
              rir: set.rir,
              restTime: set.restTime,
            })),
          },
        })),
      },
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: 'Workout created successfully',
    data: { workout },
  });
}));

// Update workout
router.put('/:id', asyncHandler(async (req: AuthRequest, res: Response) => {
  const updateSchema = workoutSchema.partial();
  const validatedData = updateSchema.parse(req.body);

  const existingWorkout = await prisma.workout.findFirst({
    where: { 
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!existingWorkout) {
    throw createError('Workout not found', 404);
  }

  const workout = await prisma.workout.update({
    where: { id: req.params.id },
    data: {
      date: validatedData.date ? new Date(validatedData.date) : undefined,
      duration: validatedData.duration,
      notes: validatedData.notes,
    },
    include: {
      exercises: {
        include: {
          exercise: true,
          sets: true,
        },
        orderBy: { order: 'asc' },
      },
    },
  });

  res.json({
    success: true,
    message: 'Workout updated successfully',
    data: { workout },
  });
}));

// Delete workout
router.delete('/:id', asyncHandler(async (req: AuthRequest, res: Response) => {
  const existingWorkout = await prisma.workout.findFirst({
    where: { 
      id: req.params.id,
      userId: req.user!.id,
    },
  });

  if (!existingWorkout) {
    throw createError('Workout not found', 404);
  }

  await prisma.workout.delete({
    where: { id: req.params.id },
  });

  res.json({
    success: true,
    message: 'Workout deleted successfully',
  });
}));

export { router as workoutRoutes };
