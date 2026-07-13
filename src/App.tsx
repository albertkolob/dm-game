import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Play = lazy(() => import('./pages/Play').then((m) => ({ default: m.Play })));
const Teacher = lazy(() => import('./pages/Teacher').then((m) => ({ default: m.Teacher })));
const Verse = lazy(() => import('./pages/Verse').then((m) => ({ default: m.Verse })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:mode" element={<Play />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/verse/:id" element={<Verse />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
