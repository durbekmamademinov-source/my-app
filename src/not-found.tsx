import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-[#040816] via-[#0d1027] to-[#08132e] px-6 text-white">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-black/40 backdrop-blur-xl sm:max-w-xl">
                <div className="mb-6 text-center">
                    <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">404 — Page not found</p>
                    <h1 className="mt-4 text-7xl font-black text-white sm:text-8xl">Oops!</h1>
                </div>

                <p className="mx-auto max-w-md text-center text-base leading-8 text-slate-300 sm:text-lg">
                    The page you are looking for doesn’t exist or has been moved. Let’s get you back to the movie selection.
                </p>

                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                        Go back home
                    </Link>
                    <Link
                        to="/movie/1"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        Browse movies
                    </Link>
                </div>
            </div>
        </div>
    )
}
