import { Request, Response } from 'express';

import { fetchAllPositions } from '../services/positions.service';
import catchAsync from '../utils/catchAsync';

export const getAllPositions = catchAsync(async (req: Request, res: Response) => {
  const positions = await fetchAllPositions();

  if (!positions) {
    return res.status(404).send({
      success: false,
      message: 'Positions not found'
    });
  }

  res.status(200).send({
    success: true,
    positions
  });
});
