import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../server.js';
import { asyncHandler, createError } from '../middleware/errorHandler.js';
import { logger } from '../utils/logger.js';

const router = Router();

// Validation schema
const preorderSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
});

// Create preorder
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const validatedData = preorderSchema.parse(req.body);

  // Check if email already exists in preorder
  const existingPreorder = await prisma.preorder.findUnique({
    where: { email: validatedData.email },
  });

  if (existingPreorder) {
    throw createError('This email is already on the waitlist', 409);
  }

  // Create preorder entry
  const preorder = await prisma.preorder.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      status: 'PENDING',
    },
  });

  logger.info(`New preorder: ${validatedData.email}`);

  res.status(201).json({
    success: true,
    message: 'Successfully joined the waitlist!',
    data: { preorder },
  });
}));

// Get all preorders (admin only)
router.get('/all', asyncHandler(async (req: Request, res: Response) => {
  const preorders = await prisma.preorder.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json({
    success: true,
    data: { preorders },
  });
}));

// Get preorder stats
router.get('/stats', asyncHandler(async (req: Request, res: Response) => {
  const total = await prisma.preorder.count();
  
  const today = await prisma.preorder.count({
    where: {
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    },
  });

  const thisWeek = await prisma.preorder.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  res.json({
    success: true,
    data: {
      total,
      today,
      thisWeek,
    },
  });
}));

export { router as preorderRoutes };
