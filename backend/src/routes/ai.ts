import { Router, Response } from 'express';
import { prisma } from '../server.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

// AI Workout Suggestion
router.get('/workout-suggestion', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const focusArea = (req as any).query.focusArea as string;
  const duration = parseInt((req as any).query.duration) || 60;

  // Get user's recent workouts to avoid overtraining
  const recentWorkouts = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      },
    },
    include: {
      exercises: {
        include: {
          exercise: true,
        },
      },
    },
    orderBy: { date: 'desc' },
  });

  // Get exercises based on focus area
  const exercises = await prisma.exercise.findMany({
    where: focusArea ? {
      muscleGroups: {
        has: focusArea.toUpperCase(),
      },
    } : {},
    take: 20,
    orderBy: { name: 'asc' },
  });

  // Simple AI logic to suggest workout
  const suggestedWorkout = {
    duration,
    exercises: exercises.slice(0, 5).map((exercise, index) => ({
      exercise,
      suggestedSets: 3,
      suggestedReps: '8-12',
      suggestedRest: 60,
      order: index + 1,
    })),
    notes: `AI-generated ${focusArea || 'full body'} workout based on your recent activity`,
  };

  res.json({
    success: true,
    data: {
      suggestion: suggestedWorkout,
      recentWorkoutsCount: recentWorkouts.length,
    },
  });
}));

// AI Progression Plan
router.get('/progression-plan', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const exerciseId = (req as any).query.exerciseId as string;

  if (!exerciseId) {
    throw createError('Exercise ID is required', 400);
  }

  // Get user's performance history for this exercise
  const workoutHistory = await prisma.workoutExercise.findMany({
    where: {
      exerciseId,
      workout: {
        userId,
      },
    },
    include: {
      sets: {
        orderBy: { createdAt: 'desc' },
        take: 1, // Get only the latest set from each workout
      },
      workout: {
        orderBy: { date: 'desc' },
      },
    },
    orderBy: {
      workout: {
        date: 'desc',
      },
    },
    take: 10, // Last 10 workouts
  });

  // Calculate progression recommendations
  const latestSet = workoutHistory[0]?.sets[0];
  const progressionPlan = {
    currentWeight: latestSet?.weight || 0,
    currentReps: latestSet?.reps || 0,
    recommendations: [
      {
        week: 1,
        weight: latestSet?.weight || 0,
        reps: latestSet?.reps || 8,
        notes: 'Maintain current weight, focus on form',
      },
      {
        week: 2,
        weight: (latestSet?.weight || 0) + 2.5,
        reps: latestSet?.reps || 8,
        notes: 'Increase weight by 2.5kg if form is good',
      },
      {
        week: 3,
        weight: (latestSet?.weight || 0) + 5,
        reps: latestSet?.reps || 8,
        notes: 'Progressive overload phase',
      },
      {
        week: 4,
        weight: (latestSet?.weight || 0) + 2.5,
        reps: (latestSet?.reps || 8) + 2,
        notes: 'Deload week with higher reps',
      },
    ],
  };

  res.json({
    success: true,
    data: { progressionPlan },
  });
}));

// AI Readiness Score
router.get('/readiness-score', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const [recentWorkouts, recentRecovery] = await Promise.all([
    prisma.workout.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Last 3 days
        },
      },
      orderBy: { date: 'desc' },
    }),
    prisma.recoveryData.findMany({
      where: {
        userId,
        date: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      orderBy: { date: 'desc' },
      take: 1,
    }),
  ]);

  // Calculate readiness score
  let readinessScore = 85; // Base score

  // Adjust based on recent training volume
  if (recentWorkouts.length >= 2) {
    readinessScore -= 15;
  } else if (recentWorkouts.length === 1) {
    readinessScore -= 5;
  }

  // Adjust based on recovery data
  if (recentRecovery.length > 0) {
    const recovery = recentRecovery[0];
    if (recovery.sleepHours && recovery.sleepHours < 7) {
      readinessScore -= 10;
    }
    if (recovery.fatigueScore && recovery.fatigueScore > 70) {
      readinessScore -= 15;
    }
  }

  readinessScore = Math.max(0, Math.min(100, readinessScore));

  res.json({
    success: true,
    data: {
      readinessScore,
      recommendation: readinessScore >= 80 ? 'Ready for intense training' :
                    readinessScore >= 60 ? 'Moderate training recommended' :
                    readinessScore >= 40 ? 'Light training or rest' :
                    'Rest day recommended',
      factors: {
        recentWorkouts: recentWorkouts.length,
        recoveryData: recentRecovery.length > 0,
      },
    },
  });
}));

export { router as aiRoutes };
