import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'movie-media',
      allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov'],
      resource_type: file.mimetype.startsWith('video') ? 'video' : 'image',
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  }
});

export const upload = multer({ storage });

export const deleteMedia = async (publicId: string, type: 'image' | 'video'): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: type
    });
  } catch (error) {
    console.error('Error deleting media:', error);
    throw error;
  }
};