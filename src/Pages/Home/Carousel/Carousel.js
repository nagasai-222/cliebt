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

import "./Carousel.css";
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
    <div className="h-screen mt-20">
      <div className="h-5/6">
        <Swiper
          // cssMode={true}
          effect={"fade"}
          navigation={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          loop={true}
          keyboard={{
            enabled: true,
          }}
          mousewheel={true}
          pagination={{
            type: "progressbar",
          }}
          modules={[
            EffectFade,
            Autoplay,
            Navigation,
            Pagination,
            Mousewheel,
            Keyboard,
          ]}
          className="mySwiper"
        >
          {sliders.map((slider) => (
            <SwiperSlide>
              <div className="absolute inset-x-0 bottom-52 h-16 z-20">
                <p className="text-2xl font-bold">
                  Caring for our community like family
                </p>
                <button className="btn bg-blue-700 text-white px-6 py-4 rounded-md mt-5 ">
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
