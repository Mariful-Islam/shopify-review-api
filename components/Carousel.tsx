// components/Carousel.js
'use client'; // if you're using Next.js 13+ app directory

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



export default function Carousel({images}: {images: any[]}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000 }}
      loop={true}
    >
      {images?.map((src:any, index:number) => (
        <SwiperSlide key={index}>
          <img src={src.src} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
