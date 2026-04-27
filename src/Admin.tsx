import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Delete } from './Delete';
import { LockKeyhole, PlusCircle, LayoutDashboard, Globe, Star, Image as ImageIcon, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        img: '',
        description: '',
        ageLimit: '',
        language: 'uz,ru,eng',
        rating: '',
        quality: '4k'
    });

    const DEFAULT_PASSWORD = "admin777";

    // useEffect(() => {
    //     const saved = localStorage.getItem("admin_login");
    //     if (saved === "true") {
    //         setIsLoggedIn(true);
    //     }
    // }, []);


    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === DEFAULT_PASSWORD) {
            setIsLoggedIn(true);
            toast.success("Xush kelibsiz, Admin!");
        } else {
            toast.error("Parol noto'g'ri!");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.img) {
            toast.warning("Iltimos, barcha maydonlarni to'ldiring");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/kinolar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    ageLimit: Number(formData.ageLimit),
                    rating: Number(formData.rating),
                }),
            });

            if (response.ok) {
                toast.success("Kino muvaffaqiyatli qo'shildi!");

                setFormData({
                    title: '',
                    img: '',
                    description: '',
                    ageLimit: '',
                    language: 'uz,ru,eng',
                    rating: '',
                    quality: '4k'
                });
            } else {
                toast.error("Server xatolik!");
            }
        } catch (error) {
            toast.error("Server bilan bog'lanishda xato!");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6">
                {/* Asosiy konteyner kengligini belgilab olamiz */}
                <div className="w-full max-w-md">

                    {/* 1. Orqaga qaytish tugmasi endi karta tepasida chapda turadi */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Orqaga qaytish</span>
                    </button>

                    {/* 2. Login kartasi */}
                    <div className="bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl w-full">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-green-500/10 rounded-full text-green-500">
                                <LockKeyhole size={32} />
                            </div>
                        </div>

                        <h2 className="text-white text-2xl font-black text-center mb-8 tracking-tight">
                            ADMIN KIRISH
                        </h2>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Maxfiy parolni kiriting"
                                    className="w-full bg-black border border-white/10 rounded-2xl p-4 pr-12 text-white outline-none focus:border-green-500 transition-all placeholder:text-gray-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-green-900/20"
                            >
                                TIZIMGA KIRISH
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors"
            >
                <ChevronLeft size={24} /> Orqaga qaytish
            </button>
            <div className="max-w-5xl mx-auto">

                <header className="flex items-center gap-4 mb-12">
                    <LayoutDashboard className="text-green-500" size={32} />
                    <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                        Admin Dashboard
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">

                    <section className="bg-[#111] p-8 rounded-3xl border border-white/5">
                        <div className="flex items-center gap-2 mb-8">
                            <PlusCircle className="text-green-500" size={24} />
                            <h2 className="text-xl font-bold uppercase">
                                Yangi film qo'shish
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                                    <ImageIcon size={14} /> Poster URL
                                </label>
                                <input
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-green-500"
                                    value={formData.img}
                                    onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">
                                    Film nomi
                                </label>
                                <input
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-green-500"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">
                                    Tavsif (Description)
                                </label>
                                <textarea
                                    className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-green-500 h-32"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4 md:col-span-2">

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">
                                        Yosh
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-green-500"
                                        value={formData.ageLimit}
                                        onChange={(e) => setFormData({ ...formData, ageLimit: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <Star size={10} /> Reyting
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-green-500"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                                        <Globe size={10} /> Sifat
                                    </label>
                                    <select
                                        className="w-full bg-black border border-white/10 rounded-xl p-3 outline-none focus:border-green-500"
                                        value={formData.quality}
                                        onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                                    >
                                        <option value="4k">4K</option>
                                        <option value="Full HD">Full HD</option>
                                        <option value="HD">HD</option>
                                    </select>
                                </div>

                            </div>

                            <button className="md:col-span-2 bg-[#55b331] text-black font-black py-4 rounded-2xl hover:bg-[#49a029] transition-all shadow-lg shadow-green-500/10">
                                BAZAGA SAQLASH
                            </button>

                        </form>
                    </section>

                    <Delete />

                </div>
            </div>
        </div>
    );
}