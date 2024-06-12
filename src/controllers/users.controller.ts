import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { uploadFileToCloud } from '../services/file.service';
import {
  countUsers,
  createNewUser,
  getPaginatedUsers,
  getUserById as getUserByIdService
} from '../services/users.service';
import catchAsync from '../utils/catchAsync';
import { formatValidationErrors } from '../utils/handleErrorsDisplay';

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const validatedRequest = validationResult(req);

  if (!validatedRequest.isEmpty()) {
    return res.status(422).send(formatValidationErrors(validatedRequest.array()));
  }

  const data = matchedData(req, { locations: ['body'] });

  const photo = req.file?.path;

  const uploadedFile = await uploadFileToCloud(photo || '');

  const newUser = await createNewUser({
    name: data.name as string,
    email: data.email as string,
    phone: data.phone as string,
    position_id: +data.position_id,
    photo: uploadedFile as string
  });

  if (!newUser) {
    return res.status(409).send({
      success: false,
      message: 'User with this phone or email already exist'
    });
  }

  res.status(201).send({
    success: true,
    user_id: newUser.id,
    message: 'New user successfully registered.'
  });

  res.redirect('/users');
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const count = parseInt(req.query.count as string) || 10; // Number of users per page
  const page = parseInt(req.query.page as string) || 1; // Page number

  const totalUsers = await countUsers();
  const totalPages = Math.ceil(totalUsers / count);

  // Ensure page number is within valid range
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const users = await getPaginatedUsers(count, currentPage);

  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  const response = {
    success: true,
    page: currentPage,
    total_pages: totalPages,
    total_users: totalUsers,
    count: users.length,
    links: {
      next_link: nextPage ? `/users?count=${count}&page=${nextPage}` : null,
      prev_link: prevPage ? `/users?count=${count}&page=${prevPage}` : null
    },
    users: [...users]
  };

  res.json(response);
});

export const getUserById = catchAsync(async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const user = await getUserByIdService(userId);

  if (!user) {
    return res.status(404).send({
      success: false,
      message: 'User not found.'
    });
  }

  res.json(user);
});
