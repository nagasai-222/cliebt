import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  EffectFade,
} from "swiper";

import './Carousel.css'
import { useQuery } from "@tanstack/react-query";

const Carousel = () => {
    const {
      data: sliders = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["slider"],
      queryFn: async () => {
        const res = await fetch("sliders.json");
        const data = await res.json();
        return data;
      },
    });
    if (isLoading) {
      return <h1>Loading</h1>;
    }
    refetch();
  return (
    <div className="h-screen">
      <div className="h-5/6">
        <Swiper
          // cssMode={true}
          effect={"fade"}
          navigation={true}
          // autoplay={{
          //   delay: 4500,
          //   disableOnInteraction: false,
          // }}
          loop={true}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            type: "progressbar",
          }}
          modules={[EffectFade, Autoplay, Navigation, Pagination, Keyboard]}
          className="mySwiper carSwipper"
        >
          {sliders.map((slider) => (
            <SwiperSlide className="carSwiperSlide">
              <div className="absolute inset-x-0 bottom-62 h-16 z-20">
                <p className="lg:text-4xl sm:text-3xl font-bold p-2 m-2 text-green-900 title">
                  {slider.title}
                </p>
                <button className="btn button bg-green-800 text-white text-xl font-bold px-6 py-4 rounded-md mt-5 ">
                  Make an Appointment
                </button>
              </div>
              <img className="relative" src={slider?.img} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
