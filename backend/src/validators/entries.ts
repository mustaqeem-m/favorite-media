import { z } from 'zod';

export const createEntrySchema = z.object({
  title: z.string().min(1),
  type: z.enum(['Movie', 'TV Show']),
  director: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  notes: z.string().optional(),
  posterUrl: z.string().url().optional(),
});

export const updateEntrySchema = createEntrySchema.partial();
