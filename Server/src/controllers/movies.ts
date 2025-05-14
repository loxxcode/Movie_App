import { Request, Response } from 'express';
import Movie from '../models/Movie';
import { IMovie, IMovieMedia } from '../interfaces/IMovie';

// ... (previous controller methods)

export const addMediaToMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const mediaItem: IMovieMedia = req.body;
    
    const movie = await Movie.findByIdAndUpdate(
      id,
      { $push: { media: mediaItem } },
      { new: true }
    );
    
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeMediaFromMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, mediaId } = req.params;
    
    const movie = await Movie.findByIdAndUpdate(
      id,
      { $pull: { media: { _id: mediaId } } },
      { new: true }
    );
    
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMovieTrailer = async (req: Request, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    
    const trailer = movie.media.find(item => item.type === 'trailer') || 
                   { url: movie.trailer, type: 'trailer' };
    
    res.status(200).json(trailer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};