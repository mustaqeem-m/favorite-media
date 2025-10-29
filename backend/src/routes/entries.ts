// ---------- src/routes/entries.ts ----------
import { Router } from 'express';
import * as ctrl from '../controllers/entries';

const router = Router();

router.get('/', ctrl.getEntries);
router.post('/', ctrl.createEntry);
router.put('/:id', ctrl.updateEntry);
router.delete('/:id', ctrl.deleteEntry);

export default router;
