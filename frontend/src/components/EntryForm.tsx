// frontend/src/components/EntryForm.tsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createEntry, updateEntry } from '../lib/api';

/* Zod schema (keeps frontend validation in-sync with backend) */
const dataUrlRegex = /^data:[\w+-]+\/[\w+.-]+;base64,[A-Za-z0-9+/]+=*$/;

const entrySchema = z.object({
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

export type EntryShape = {
  id?: number;
  title: string;
  type: 'Movie' | 'TV Show';
  director?: string;
  budget?: string;
  location?: string;
  duration?: string;
  year?: string;
  notes?: string;
  posterUrl?: string;
};

type Props = {
  initial?: Partial<EntryFormType> & { id?: number };
  onClose?: () => void;
  onSaved?: (entry: any) => void;
};

export default function EntryForm({ initial, onClose, onSaved }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormType>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: '',
      type: 'Movie',
      director: '',
      budget: '',
      location: '',
      duration: '',
      year: '',
      notes: '',
      posterUrl: '',
      ...(initial ?? {}),
    },
  });

  useEffect(() => {
    // reset when initial changes (useful for Edit)
    reset({
      title: initial?.title ?? '',
      type: (initial?.type as any) ?? 'Movie',
      director: initial?.director ?? '',
      budget: initial?.budget ?? '',
      location: initial?.location ?? '',
      duration: initial?.duration ?? '',
      year: initial?.year ?? '',
      notes: initial?.notes ?? '',
      posterUrl: initial?.posterUrl ?? '',
    });
  }, [initial, reset]);

  // close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const onSubmit = async (data: EntryFormType) => {
    try {
      if (initial && (initial as any).id) {
        const updated = await updateEntry((initial as any).id, data);
        onSaved && onSaved(updated);
      } else {
        const created = await createEntry(data);
        onSaved && onSaved(created);
      }
      onClose && onClose();
    } catch (err: any) {
      console.error('SAVE ERROR', err, err?.response);
      const server = err?.response ? JSON.stringify(err.response) : null;
      const msg = server ?? err?.message ?? 'Unknown error';
      alert('Save failed: ' + msg);
    }
  };

  const modal = (
    <div
      // inline styles ensure overlay always visible and above everything
      style={{
        position: 'fixed',
        inset: '0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        zIndex: 2147483647,
      }}
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: 'min(900px, 96%)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'white',
          padding: '1.25rem',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        }}
      >
        <h2
          style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            marginBottom: '0.75rem',
          }}
        >
          {initial && (initial as any).id ? 'Edit Entry' : 'Add Entry'}
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          <div style={{ gridColumn: '1 / -1' }}>
            <input
              {...register('title')}
              placeholder="Title"
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #ddd',
                borderRadius: 6,
              }}
            />
            {errors.title && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register('type')}
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #ddd',
                borderRadius: 6,
              }}
            >
              <option>Movie</option>
              <option>TV Show</option>
            </select>
            {errors.type && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.type.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('director')}
              placeholder="Director"
              style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
            />
            {errors.director && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.director.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('budget')}
              placeholder="Budget"
              style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
            />
            {errors.budget && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.budget.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('location')}
              placeholder="Location"
              style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
            />
            {errors.location && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('duration')}
              placeholder="Duration"
              style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
            />
            {errors.duration && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.duration.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('year')}
              placeholder="Year/Time"
              style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
            />
            {errors.year && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.year.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register('posterUrl')}
              placeholder="Poster URL (http(s) or data URI)"
              style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
            />
            {errors.posterUrl && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.posterUrl.message}
              </p>
            )}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <textarea
              {...register('notes')}
              placeholder="Notes"
              style={{
                padding: 8,
                border: '1px solid #ddd',
                borderRadius: 6,
                width: '100%',
              }}
            />
            {errors.notes && (
              <p style={{ color: 'red', marginTop: 6 }}>
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>

        <div
          style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}
        >
          <button
            type="button"
            onClick={() => onClose && onClose()}
            style={{
              marginRight: 8,
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #ddd',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              background: '#16a34a',
              color: 'white',
              border: 'none',
            }}
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(modal, document.body);
}
