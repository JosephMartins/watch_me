import {createContext, useContext, ReactNode, useEffect, useState} from 'react';
import { api } from '../services/api';

interface FilmsProviderProps{
  children: ReactNode;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenresContextData{
  genres: GenreResponseProps[];
  sideBarProps: {
    handleToggleMenu: (id: number) => void;
    selectedGenreId: number;
  }
  movies: MovieProps[];
}



export const GenresContext = createContext<GenresContextData>({} as GenresContextData);

export function FilmsProvider({children}: FilmsProviderProps){
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleToggleMenu(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <GenresContext.Provider value={{genres, movies, sideBarProps: {handleToggleMenu, selectedGenreId }}}>
      {children}
    </GenresContext.Provider>
  )
}

export function useFilms(){
    const context = useContext(GenresContext);
    return context;
}