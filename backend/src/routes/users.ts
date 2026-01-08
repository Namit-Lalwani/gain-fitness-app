import { Router, Response } from 'express';
import { prisma } from '../server.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All user routes require authentication
router.use(authenticate);

// Get user stats
router.get('/stats', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const [workoutCount, bodyMeasurements, goals] = await Promise.all([
    prisma.workout.count({
      where: { userId },
    }),
    prisma.bodyMeasurement.count({
      where: { userId },
    }),
    prisma.userGoal.count({
      where: { userId, isActive: true },
    }),
  ]);

  res.json({
    success: true,
    data: {
      totalWorkouts: workoutCount,
      totalMeasurements: bodyMeasurements,
      activeGoals: goals,
    },
  });
}));

// Delete user account
router.delete('/account', asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  // This will cascade delete all related data
  await prisma.user.delete({
    where: { id: userId },
  });

  res.json({
    success: true,
    message: 'Account deleted successfully',
  });
}));

export { router as userRoutes };
