import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { createEntrySchema, updateEntrySchema } from '../validators/entries';

export const getEntries = async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1);
  const limit = Math.min(Number(req.query.limit ?? 20), 100);
  const skip = (page - 1) * limit;

  try {
    const [data, total] = await Promise.all([
      prisma.entry.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.entry.count(),
    ]);
    res.json({ data, page, limit, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createEntry = async (req: Request, res: Response) => {
  try {
    const parsed = createEntrySchema.parse(req.body);
    const entry = await prisma.entry.create({ data: parsed });
    res.status(201).json(entry);
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ error: err.issues });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateEntry = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  try {
    const parsed = updateEntrySchema.parse(req.body);
    const entry = await prisma.entry.update({ where: { id }, data: parsed });
    res.json(entry);
  } catch (err: any) {
    if (err?.code === 'P2025')
      return res.status(404).json({ error: 'Not found' });
    if (err?.issues) return res.status(400).json({ error: err.issues });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  try {
    await prisma.entry.delete({ where: { id } });
    res.json({ success: true });
  } catch (err: any) {
    if (err?.code === 'P2025')
      return res.status(404).json({ error: 'Not found' });
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
