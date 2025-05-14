import { Schema, model, Document } from 'mongoose';
import { IMovie, IMovieMedia } from '../interfaces/IMovie';

const movieMediaSchema = new Schema<IMovieMedia>({
  url: { type: String, required: true },
  publicId: { type: String },
  type: { type: String, enum: ['image', 'video', 'trailer'], required: true },
  isFeatured: { type: Boolean, default: false }
});

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: [String], required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
  plot: { type: String, required: true },
  poster: { type: String, required: true },
  backdrop: { type: String, required: true },
  media: [movieMediaSchema],
  trailer: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10, required: true },
  runtime: { type: Number, required: true }, // in minutes
  language: { type: [String], required: true },
  country: { type: [String], required: true },
  awards: { type: String },
  imdbId: { type: String },
  status: {
    type: String,
    enum: ['released', 'upcoming', 'post-production'],
    default: 'released'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search functionality
movieSchema.index({
  title: 'text',
  director: 'text',
  plot: 'text',
  'actors': 'text'
});

export default model<IMovie & Document>('Movie', movieSchema);