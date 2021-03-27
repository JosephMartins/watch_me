import { useFilms } from "../hooks/useGenres";
import { MovieCard } from '../components/MovieCard';
import '../styles/content.scss';


export function Content() {
  const {movies} = useFilms();
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span></span></span>
      </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}