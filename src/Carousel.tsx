import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import avatar from './assets/avatar.jpeg'
import kino2 from './assets/kino 2.jpeg'
import kino3 from './assets/matonatli maryam.jpeg'
import kino4 from './assets/ot va qiz.jpeg'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function AutoplayBanner() {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    )

    const movies = [
        { src: avatar, title: "Avatar" },
        { src: kino2, title: "Jonli Efirlar Markazi" },
        { src: kino3, title: "Matonatli Maryam" },
        { src: kino4, title: "So'nggi Urinish" },
    ]

    return (
        // py-4 olib tashlandi, w-full qo'shildi
        <div className="w-full overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent className="ml-0"> 
                    {movies.map((movie, index) => (
                        <CarouselItem key={index} className="pl-0"> {/* pl-0 slide to'liq yopishishi uchun */}
                            <div className="relative h-[600px] w-full overflow-hidden">
                                <img
                                    src={movie.src}
                                    alt={movie.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Rasm ustidagi gradient va matn */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-10">
                                    <h2 className="text-white text-4xl font-bold drop-shadow-lg">
                                        {movie.title}
                                    </h2>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Tugmalar joylashuvi */}
                <CarouselPrevious className="left-6 bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12" />
                <CarouselNext className="right-6 bg-white/20 hover:bg-white/40 border-none text-white h-12 w-12" />
            </Carousel>
        </div>
    )
}

export default AutoplayBanner;