export interface IMovieMedia {
    url: string;
    publicId?: string; // For cloud storage references
    type: 'image' | 'video' | 'trailer';
    isFeatured?: boolean;
  }
  
  export interface IMovie {
    title: string;
    slug: string; // For SEO-friendly URLs
    year: number;
    releaseDate: Date;
    genre: string[];
    director: string;
    actors: string[];
    plot: string;
    poster: string; // Main poster image
    backdrop: string; // Background image
    media: IMovieMedia[]; // Array of all media (images, videos, trailers)
    trailer: string; // Main trailer URL
    rating: number;
    runtime: number; // In minutes
    language: string[];
    country: string[];
    awards?: string;
    imdbId?: string;
    status: 'released' | 'upcoming' | 'post-production';
    createdAt?: Date;
    updatedAt?: Date;
  }