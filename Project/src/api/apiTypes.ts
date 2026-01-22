import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number().nullable(),
  releaseDate: z.string().nullable(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string().url().nullable(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string().url().nullable(),
  trailerYouTubeId: z.string().nullable(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string().nullable(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const movieList = z.array(MovieSchema);

export type MovieList = z.infer<typeof movieList>;

export const genresSchema = z.array(z.string());

export type GenresSchema = z.infer<typeof genresSchema>;

export const RegistrationSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
});

export type RegistrationType = z.infer<typeof RegistrationSchema>;

export const UserSchema = z.object({
  favorites: z.array(z.string()),
  surname: z.string(),
  name: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof UserSchema>
