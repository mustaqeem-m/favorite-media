import { z } from 'zod';

const dataUrlRegex = /^data:[\w+-]+\/[\w+.-]+;base64,[A-Za-z0-9+/]+=*$/;

export const entrySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.enum(['Movie', 'TV Show'], {
    required_error: 'Select Movie or TV Show',
  }),
  director: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  notes: z.string().optional(),
  posterUrl: z
    .string()
    .optional()
    .refine(
      (v) =>
        v === undefined ||
        v === '' ||
        /^https?:\/\//.test(v) ||
        dataUrlRegex.test(v),
      { message: 'Poster must be an http(s) URL or a valid data URI' }
    ),
});

export type EntryFormType = z.infer<typeof entrySchema>;
