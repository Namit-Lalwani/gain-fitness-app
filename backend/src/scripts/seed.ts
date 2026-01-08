import { PrismaClient } from '@prisma/client';
import { ExerciseCategory, ExerciseDifficulty, MuscleGroup } from '@prisma/client';

const prisma = new PrismaClient();

const exercises = [
  // Chest exercises
  {
    name: 'Bench Press',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['CHEST', 'TRICEPS', 'SHOULDERS'] as MuscleGroup[],
    instructions: 'Lie on bench, grip bar slightly wider than shoulder-width, lower to chest, press up',
    difficulty: 'INTERMEDIATE' as ExerciseDifficulty,
    equipment: 'Barbell',
  },
  {
    name: 'Dumbbell Flyes',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['CHEST'] as MuscleGroup[],
    instructions: 'Lie on bench holding dumbbells, open arms wide, bring back together',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Dumbbells',
  },
  {
    name: 'Push-ups',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['CHEST', 'TRICEPS', 'CORE'] as MuscleGroup[],
    instructions: 'Standard push-up position, lower chest to ground, push back up',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Bodyweight',
  },
  
  // Back exercises
  {
    name: 'Pull-ups',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['BACK', 'BICEPS'] as MuscleGroup[],
    instructions: 'Hang from bar, pull chin over bar, lower slowly',
    difficulty: 'INTERMEDIATE' as ExerciseDifficulty,
    equipment: 'Pull-up bar',
  },
  {
    name: 'Deadlifts',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['BACK', 'LEGS', 'GLUTES', 'CORE'] as MuscleGroup[],
    instructions: 'Stand with bar over feet, bend knees, grip bar, stand up straight',
    difficulty: 'ADVANCED' as ExerciseDifficulty,
    equipment: 'Barbell',
  },
  {
    name: 'Bent Over Rows',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['BACK', 'BICEPS'] as MuscleGroup[],
    instructions: 'Bend at hips, grip bar, pull to lower chest',
    difficulty: 'INTERMEDIATE' as ExerciseDifficulty,
    equipment: 'Barbell',
  },

  // Leg exercises
  {
    name: 'Squats',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['LEGS', 'GLUTES', 'CORE'] as MuscleGroup[],
    instructions: 'Stand with bar on shoulders, squat to parallel, stand up',
    difficulty: 'INTERMEDIATE' as ExerciseDifficulty,
    equipment: 'Barbell',
  },
  {
    name: 'Lunges',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['LEGS', 'GLUTES'] as MuscleGroup[],
    instructions: 'Step forward, lower back knee to ground, push back to start',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Bodyweight/Dumbbells',
  },
  {
    name: 'Leg Press',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['LEGS', 'GLUTES'] as MuscleGroup[],
    instructions: 'Sit in machine, push platform away, control return',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Leg Press Machine',
  },

  // Shoulder exercises
  {
    name: 'Overhead Press',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['SHOULDERS', 'TRICEPS'] as MuscleGroup[],
    instructions: 'Press barbell overhead from shoulders to full extension',
    difficulty: 'INTERMEDIATE' as ExerciseDifficulty,
    equipment: 'Barbell',
  },
  {
    name: 'Lateral Raises',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['SHOULDERS'] as MuscleGroup[],
    instructions: 'Raise dumbbells sideways to shoulder height, lower slowly',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Dumbbells',
  },

  // Arm exercises
  {
    name: 'Bicep Curls',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['BICEPS'] as MuscleGroup[],
    instructions: 'Curl dumbbells or barbell from arms extended to fully contracted',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Dumbbells/Barbell',
  },
  {
    name: 'Tricep Dips',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['TRICEPS', 'CHEST'] as MuscleGroup[],
    instructions: 'Use parallel bars or bench, lower body, push back up',
    difficulty: 'INTERMEDIATE' as ExerciseDifficulty,
    equipment: 'Parallel bars/Bench',
  },

  // Core exercises
  {
    name: 'Plank',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['CORE'] as MuscleGroup[],
    instructions: 'Hold push-up position on forearms, keep body straight',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Bodyweight',
  },
  {
    name: 'Crunches',
    category: 'STRENGTH' as ExerciseCategory,
    muscleGroups: ['CORE'] as MuscleGroup[],
    instructions: 'Lie on back, lift shoulders off ground, lower slowly',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Bodyweight',
  },

  // Cardio exercises
  {
    name: 'Running',
    category: 'CARDIO' as ExerciseCategory,
    muscleGroups: ['LEGS', 'CORE'] as MuscleGroup[],
    instructions: 'Run at steady pace for desired duration',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Treadmill/Outdoor',
  },
  {
    name: 'Cycling',
    category: 'CARDIO' as ExerciseCategory,
    muscleGroups: ['LEGS', 'CORE'] as MuscleGroup[],
    instructions: 'Cycle at moderate to high intensity',
    difficulty: 'BEGINNER' as ExerciseDifficulty,
    equipment: 'Stationary bike/Bicycle',
  },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing exercises
    await prisma.exercise.deleteMany();
    console.log('🗑️  Cleared existing exercises');

    // Insert exercises
    for (const exercise of exercises) {
      await prisma.exercise.create({
        data: exercise,
      });
    }

    console.log(`✅ Successfully seeded ${exercises.length} exercises`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seed };
