import prisma from '../prismaClient';
import APIError from '../utils/APIError';

export const fetchAllPositions = async () => {
  try {
    const positions = await prisma.position.findMany({
      select: { id: true, name: true }
    });

    return positions;
  } catch (error) {
    throw new APIError(500, 'Internal Server Error');
  }
};
