import { Router } from 'express';
import { ImageRouter } from './filterImage.router';

const router: Router = Router();

router.use('/filteredimage', ImageRouter);

export const IndexRouter: Router = router;