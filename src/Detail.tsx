import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, Star, Globe, Monitor } from 'lucide-react';

interface MovieDetail {
    id: number;
    img: string;
    title: string;
    description: string;
    ageLimit: number;
    language: string;
    rating: number;
    quality: string;
}

export function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<MovieDetail | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/kinolar/${id}`)
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error("Xatolik:", err));
    }, [id]);

    if (!movie) return <div className="text-white text-center p-20 font-bold">Yuklanmoqda...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Orqa fon uchun rasm (blurry) */}
            <div className="absolute inset-0 h-150 opacity-20 blur-3xl z-0">
                <img src={movie.img} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-10">
                {/* Orqaga qaytish */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors"
                >
                    <ChevronLeft size={24} /> Orqaga qaytish
                </button>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Chap taraf: Poster */}
                    <div className="w-full md:w-87.5 shrink-0">
                        <img
                            src={movie.img}
                            alt={movie.title}
                            className="w-full rounded-2xl shadow-2xl border border-white/10"
                        />
                    </div>

                    {/* O'ng taraf: Ma'lumotlar */}
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-[#00ff00]">
                            {movie.title}
                        </h1>

                        {/* Metama'lumotlar qatori */}
                        <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
                            <span className="bg-[#55b331] px-3 py-1 rounded-lg text-black">{movie.quality}</span>
                            <span className="border border-white/20 px-3 py-1 rounded-lg text-gray-300">{movie.ageLimit}+</span>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star size={18} fill="currentColor" />
                                <span>{movie.rating}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                            {movie.description}
                        </p>

                        {/* Qo'shimcha detallar */}
                        <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
                            <div className="flex items-center gap-3">
                                <Globe className="text-[#00ff00]" size={20} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Tillar</p>
                                    <p className="text-sm font-semibold">{movie.language.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Monitor className="text-[#00ff00]" size={20} />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase">Sifat</p>
                                    <p className="text-sm font-semibold">{movie.quality.toUpperCase()} Ultra HD</p>
                                </div>
                            </div>
                        </div>

                        {/* Tugmalar */}
                        <div className="flex items-center gap-4 mt-4">
                            <button className="flex items-center gap-3 bg-[#55b331] hover:bg-[#49a029] text-white px-10 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl shadow-green-500/20">
                                <Play fill="currentColor" /> TOMOSHA QILISH
                            </button>
                            <button className="p-5 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                                Sevimli
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;