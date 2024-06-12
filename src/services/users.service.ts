import prismaClient from '../prismaClient';
import APIError from '../utils/APIError';

interface CreateNewUser {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: string;
}

export const getUserById = async (userId: number) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        photo: true,
        position: {
          select: {
            name: true
          }
        }
      }
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      position: user.position.name
    };
  } catch (error) {
    throw new APIError(500, 'Error fetching user by ID.');
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    if (!email) {
      throw new APIError(400, 'Email or phone is required.');
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  } catch (error) {
    throw new APIError(500, 'Error fetching user by email.');
  }
};

export const getUserByPhone = async (phone: string) => {
  try {
    if (!phone) {
      throw new APIError(400, 'Email or phone is required.');
    }

    const user = await prismaClient.user.findUnique({
      where: {
        phone: phone
      }
    });

    return user;
  } catch (error) {
    throw new APIError(500, 'Error fetching user by phone.');
  }
};

export const createNewUser = async (data: CreateNewUser) => {
  try {
    const userWithSameEmail = await getUserByEmail(data.email);
    const userWithSamePhone = await getUserByPhone(data.phone);

    if (userWithSameEmail || userWithSamePhone) {
      return null;
    }

    const newUser = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        position_id: data.position_id,
        photo: data.photo
      }
    });

    return newUser;
  } catch (error) {
    throw new APIError(500, 'Error creating new user.');
  }
};

export const countUsers = async () => {
  try {
    const count = await prismaClient.user.count();

    return count;
  } catch (error) {
    throw new APIError(500, 'Error counting users.');
  }
};

export const getPaginatedUsers = async (count: number, currentPage: number) => {
  try {
    const users = await prismaClient.user.findMany({
      skip: (currentPage - 1) * count,
      take: count,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        registration_timestamp: true,
        photo: true,
        position: {
          select: {
            name: true
          }
        }
      }
    });

    const transformedUsers = users.map((user) => ({
      ...user,
      position: user.position.name
    }));

    return transformedUsers;
  } catch (error) {
    throw new APIError(500, 'Error fetching paginated users.');
  }
};

export const getUserPosition = async (positionId: number) => {
  try {
    const position = await prismaClient.position.findUnique({
      where: {
        id: positionId
      }
    });

    return position;
  } catch (error) {
    throw new APIError(500, 'Error fetching user position.');
  }
};
