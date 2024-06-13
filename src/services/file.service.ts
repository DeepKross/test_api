import { UploadApiResponse, v2 } from 'cloudinary';
import * as fs from 'node:fs';

import logger from '../config/logger';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadFileToCloud = async (photo: string): Promise<string | null> => {
  let url: UploadApiResponse | null = null;

  if (photo != null) {
    try {
      url = await v2.uploader.upload(photo, {
        transformation: {
          quality: 'auto',
          fetch_format: 'auto',
          width: 70,
          height: 70,
          crop: 'fill'
        }
      });

      //remove file
      fs.unlinkSync(photo);

      return url.url;
    } catch (error) {
      logger.error('Error uploading file to cloudinary');
      console.error(error);

      return null; // Return null in case of an error
    }
  } else {
    return null; // Return null if photo is null
  }
};
