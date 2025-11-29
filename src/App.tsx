import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Play } from './pages/Play';
import { Teacher } from './pages/Teacher';
import { Verse } from './pages/Verse';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:mode" element={<Play />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/verse/:id" element={<Verse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
