import prismaClient from '../prismaClient';
import APIError from '../utils/APIError';

interface CreateNewUser {
  name: string;
  email: string;
  phone: string;
  position_id: number;
  photo: string;
}

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
