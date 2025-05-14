import { Router } from 'express';
import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  addMediaToMovie,
  removeMediaFromMovie,
  getMovieTrailer
} from '../controllers/movies';

const router = Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.get('/:id/trailer', getMovieTrailer);
router.post('/', createMovie);
router.post('/:id/media', addMediaToMovie);
router.patch('/:id', updateMovie);
router.delete('/:id', deleteMovie);
router.delete('/:id/media/:mediaId', removeMediaFromMovie);

export default router;