import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// ... interface qismi o'zgarishsiz qoladi

export function MovieCards() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/kinolar')
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 p-8">
      {movies.map((movie) => (
        /* Har bir card endi link vazifasini o'taydi */
        <Link to={`/movie/${movie.id}`} key={movie.id} className="group">
          <div className="flex flex-col gap-2 cursor-pointer w-full">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-xl border border-white/5 bg-gray-900 transition-all duration-300 group-hover:scale-105">
              <img src={movie.img} alt={movie.title} className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-2 left-2 bg-[#55b331] px-1.5 py-0.5 rounded text-[10px] font-black text-white">
                {movie.rating}
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-200">
                {movie.ageLimit}+
              </div>
            </div>
            <div className="px-1">
              <h3 className="text-white text-sm font-semibold truncate group-hover:text-green-400 transition-colors uppercase">
                {movie.title}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MovieCards;