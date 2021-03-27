import { useFilms } from "../hooks/useGenres";
import { Button } from '../components/Button';
import '../styles/sidebar.scss';


export function SideBar() {
  const { genres, sideBarProps } = useFilms();
  
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => sideBarProps.handleToggleMenu(genre.id)}
            selected={sideBarProps.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>

  )
}