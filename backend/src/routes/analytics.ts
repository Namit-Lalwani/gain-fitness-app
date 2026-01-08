import { Router, Response } from 'express';
import { prisma } from '../server.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

// Get workout progress analytics
router.get('/progress', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const days = parseInt((req as any).query.days) || 30;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
      },
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
    orderBy: { date: 'asc' },
  });

  // Calculate analytics
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((sum, workout) => {
    return sum + workout.exercises.reduce((exerciseSum, exercise) => {
      return exerciseSum + exercise.sets.reduce((setSum, set) => {
        return setSum + (set.reps * set.weight);
      }, 0);
    }, 0);
  }, 0);

  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  const avgDuration = totalWorkouts > 0 ? totalDuration / totalWorkouts : 0;

  res.json({
    success: true,
    data: {
      period: `${days} days`,
      totalWorkouts,
      totalVolume,
      totalDuration,
      avgDuration,
      workouts,
    },
  });
}));

// Get fatigue analytics
router.get('/fatigue', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const days = parseInt((req as any).query.days) || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const [workouts, recoveryData] = await Promise.all([
    prisma.workout.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
      orderBy: { date: 'asc' },
    }),
    prisma.recoveryData.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: { date: 'asc' },
    }),
  ]);

  // Calculate fatigue score based on recent training volume and recovery
  const recentVolume = workouts.reduce((sum, workout) => {
    return sum + workout.exercises.reduce((exerciseSum, exercise) => {
      return exerciseSum + exercise.sets.reduce((setSum, set) => {
        return setSum + (set.reps * set.weight);
      }, 0);
    }, 0);
  }, 0);

  const avgSleep = recoveryData.length > 0 
    ? recoveryData.reduce((sum, data) => sum + (data.sleepHours || 0), 0) / recoveryData.length 
    : 0;

  const fatigueScore = Math.max(0, Math.min(100, (recentVolume / 10000) * 100 - (avgSleep / 8) * 20));

  res.json({
    success: true,
    data: {
      period: `${days} days`,
      fatigueScore: Math.round(fatigueScore),
      recentVolume,
      avgSleep: Math.round(avgSleep * 10) / 10,
      workouts,
      recoveryData,
    },
  });
}));

export { router as analyticsRoutes };
