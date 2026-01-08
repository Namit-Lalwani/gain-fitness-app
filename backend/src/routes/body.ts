import { Router, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

const measurementSchema = z.object({
  date: z.string().datetime(),
  weight: z.number().min(20).max(500).optional(),
  bodyFat: z.number().min(0).max(100).optional(),
  chest: z.number().min(0).optional(),
  waist: z.number().min(0).optional(),
  hips: z.number().min(0).optional(),
  biceps: z.number().min(0).optional(),
  thighs: z.number().min(0).optional(),
  calves: z.number().min(0).optional(),
  notes: z.string().optional(),
});

// Get all body measurements
router.get('/measurements', asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt((req as any).query.page) || 1;
  const limit = parseInt((req as any).query.limit) || 20;
  const skip = (page - 1) * limit;

  const [measurements, total] = await Promise.all([
    prisma.bodyMeasurement.findMany({
      where: { userId: req.user!.id },
      orderBy: { date: 'desc' },
      skip,
      take: limit,
    }),
    prisma.bodyMeasurement.count({
      where: { userId: req.user!.id },
    }),
  ]);

  res.json({
    success: true,
    data: {
      measurements,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  });
}));

// Create body measurement
router.post('/measurements', asyncHandler(async (req: AuthRequest, res: Response) => {
  const validatedData = measurementSchema.parse((req as any).body);

  const measurement = await prisma.bodyMeasurement.create({
    data: {
      userId: req.user!.id,
      date: new Date(validatedData.date),
      ...validatedData,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Measurement recorded successfully',
    data: { measurement },
  });
}));

// Get body trends
router.get('/trends', asyncHandler(async (req: AuthRequest, res: Response) => {
  const days = parseInt((req as any).query.days) || 90;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const measurements = await prisma.bodyMeasurement.findMany({
    where: {
      userId: req.user!.id,
      date: {
        gte: startDate,
      },
    },
    orderBy: { date: 'asc' },
  });

  res.json({
    success: true,
    data: {
      measurements,
      period: `${days} days`,
    },
  });
}));

export { router as bodyRoutes };
