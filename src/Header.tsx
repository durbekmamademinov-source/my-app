import React from 'react';
import { Search, Percent, Bell } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-black/80 via-transparent to-black/80 text-gray-300 border-b border-white/5 sticky top-0 z-50">
            {/* Chap taraf: Logo va Navigatsiya */}
            <div className="flex items-center gap-8">
                {/* Logo */}
                <div className="text-[#00ff00] font-bold text-2xl italic tracking-tighter cursor-pointer">
                    /TV
                </div>

                {/* Navigatsiya Linklari */}
                <nav className="hidden xl:flex gap-6 text-[14px] font-medium transition-all">
                    <a href="/" className="hover:text-white transition-colors">Bosh sahifa</a>
                    <a href="/" className="hover:text-white transition-colors">TV</a>
                    <a href="/" className="hover:text-white transition-colors">Filmlar</a>
                    <a href="/" className="hover:text-white transition-colors">Seriallar</a>
                    <a href="/" className="hover:text-white transition-colors">Multfilmlar</a>
                    <a href="/" className="hover:text-white transition-colors">Anime</a>
                    <a href="/" className="hover:text-white transition-colors">Live</a>
                    <a href="/" className="hover:text-white transition-colors">Tariflar</a>
                    <a href="/admin" className="hover:text-white transition-colors">Admin</a>
                </nav>
            </div>

            {/* O'ng taraf: Ikonkalar va Profil */}
            <div className="flex items-center gap-5">
                {/* Qidiruv ikonkasu */}
                <button className="hover:text-white transition-colors">
                    <Search size={20} strokeWidth={2.5} />
                </button>

                {/* Foiz/Aksiya ikonkasu */}
                <button className="hover:text-white transition-colors">
                    <Percent size={20} strokeWidth={2.5} />
                </button>

                {/* Bildirishnoma ikonkasu */}
                <button className="hover:text-white transition-colors relative">
                    <Bell size={20} strokeWidth={2.5} />
                    {/* Bildirishnoma borligini bildiruvchi nuqta (ixtiyoriy) */}
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
                </button>

                {/* Til va Profil */}
                <div className="flex items-center gap-3 ml-2">
                    <div className="bg-gray-800 px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer border border-white/10 hover:bg-gray-700 transition-colors uppercase">
                        Uz
                    </div>
                    <div className="w-9 h-9 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-[12px] font-bold cursor-pointer transition-all border border-white/5">
                        DM
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;