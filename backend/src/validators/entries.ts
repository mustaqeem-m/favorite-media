// backend/src/validators/entries.ts
import { z } from 'zod';

const dataUrlRegex = /^data:[\w+-]+\/[\w+.-]+;base64,[A-Za-z0-9+/]+=*$/;

export const createEntrySchema = z.object({
  title: z.string().min(1),
  type: z.enum(['Movie', 'TV Show']),
  director: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  notes: z.string().optional(),
  posterUrl: z.string().optional(),
  // posterUrl: z
  //   .string()
  //   .optional()
  //   .refine(
  //     (v) =>
  //       v === undefined ||
  //       v === '' ||
  //       /^https?:\/\//.test(v) ||
  //       dataUrlRegex.test(v),
  //     { message: 'posterUrl must be an http(s) url or a data URL' }
  //   ),
});

export const updateEntrySchema = createEntrySchema.partial();
