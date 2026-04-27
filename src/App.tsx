import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Carousel from './Carousel';
import MovieCards from './MovieCards';
import Detail from './Detail';
import NotFound from './not-found';
import './index.css';
import { Toaster } from "sonner"
import { Admin } from './Admin';

// 1. Shu yerning o'zida Home funksiyasini yozib ketamiz
function Home() {
  return (
    <>
      {/* Header Carousel ustida turishi uchun absolute */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Asosiy banner */}
      <Carousel />

      {/* Kinolar ro'yxati */}
      <div className="bg-[#0a0a0a] min-h-screen">
        <MovieCards />
      </div>
    </>
  );
}

// 2. Asosiy App komponenti
function App() {
  return (
    <Router>
      <Toaster position="top-center" richColors />
      <main className="relative w-full min-h-screen bg-[#0a0a0a]">
        <Routes>
          {/* Bosh sahifa */}
          <Route path="/" element={<Home />} />

          {/* Kino haqida batafsil sahifa */}
          <Route path="/movie/:id" element={<Detail />} />

          {/* 404 sahifa */}
          <Route path="*" element={<NotFound />} />
          {/* Detail */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
// npx json-server db.json --port 8000