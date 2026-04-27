import { useEffect, useState } from 'react';
import { toast } from "sonner";
import { Trash2, RefreshCw} from 'lucide-react';


interface Movie {
    id: number;
    title: string;
    img: string;
    quality: string;
    rating: number;
}

export function Delete() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/kinolar');
            const data = await res.json();
            setMovies(data);
        } catch {
            toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = async (id: number, title: string) => {
        try {
            const res = await fetch(`http://localhost:8000/kinolar/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setMovies(prev => prev.filter(m => m.id !== id));

                toast.success("Muvaffaqiyatli o'chirildi", {
                    description: `${title} bazadan butunlay olib tashlandi.`,
                });
            } else {
                throw new Error();
            }
        } catch {
            toast.error("Xatolik!", {
                description: "Filmni o'chirishda muammo yuz berdi."
            });
        }
    };

    return (
        <div className="mt-12 bg-[#111] p-6 rounded-3xl border border-white/5 shadow-2xl">
           
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        Mavjud Kinolar <span className="text-sm font-normal text-gray-500">({movies.length})</span>
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Bazadagi filmlarni tahrirlash yoki o'chirish
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchMovies}
                    disabled={loading}
                    className="p-3 hover:bg-white/5 rounded-2xl transition-all text-gray-400 hover:text-[#00ff00] disabled:opacity-50"
                >
                    <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="space-y-4">

                {loading && movies.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 animate-pulse text-sm">
                        Yuklanmoqda...
                    </div>
                ) : movies.length === 0 ? (
                    <div className="text-center py-20 bg-black/20 rounded-2xl border border-dashed border-white/5">
                        <p className="text-gray-500">
                            Hozircha hech qanday film topilmadi.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">

                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all group"
                            >

                                <div className="flex items-center gap-4 overflow-hidden">

                                    <div className="w-14 h-20 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
                                        <img src={movie.img} alt={movie.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-1 right-1 bg-green-500 text-[8px] px-1 rounded-sm text-black font-bold">
                                            {movie.quality}
                                        </div>
                                    </div>

                                    <div className="overflow-hidden">
                                        <h3 className="font-bold text-gray-200 group-hover:text-white transition-colors truncate uppercase italic tracking-tight">
                                            {movie.title}
                                        </h3>

                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-[10px] text-gray-500">
                                                ID: {movie.id}
                                            </span>
                                            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                            <span className="text-[10px] text-yellow-500 font-bold">
                                                ★ {movie.rating}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(movie.id, movie.title)}
                                    className="p-4 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all duration-300 shadow-lg active:scale-90"
                                >
                                    <Trash2 size={20} />
                                </button>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Delete;