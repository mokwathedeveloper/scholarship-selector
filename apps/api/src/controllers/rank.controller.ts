import { Request, Response, Router } from 'express';
import { RankService } from '../services/rank.service';

const router = Router();
const rankService = new RankService();

// POST /rank/:programId/run - Compute ranking
router.post('/:programId/run', async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;
    const { topK } = req.body; // Optional topK
    const result = await rankService.rankProgram(programId, topK);
    res.status(200).json(result);
  } catch (error: any) {
    console.error('Error running ranking:', error);
    res.status(500).json({ message: error.message || 'Failed to run ranking.' });
  }
});

// GET /rank/:programId/latest - Get latest leaderboard
router.get('/:programId/latest', async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;
    const latestRanking = await rankService.getLatestRanking(programId);
    res.status(200).json(latestRanking);
  } catch (error: any) {
    console.error('Error getting latest ranking:', error);
    res.status(500).json({ message: error.message || 'Failed to get latest ranking.' });
  }
});

export default router;