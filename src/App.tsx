import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { FilmsProvider } from './hooks/useGenres';
import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FilmsProvider>
        <SideBar />
        <Content />
      </FilmsProvider>
    </div>
  )
}