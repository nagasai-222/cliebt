import React from "react";
// Import Swiper React components
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import DetailsIcon from "@mui/icons-material/Details";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { RiAddCircleFill, RiArrowRightCircleFill } from "react-icons/ri";


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";
// import './styles.css'
import './doctor.css'

// import required modules
import { Button, CardActionArea, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import ServiceTitile from "../Services/ServiceTitle";

const DoctorInHome = () => {
  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/featureddoctors");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  refetch();
  console.log(doctors)

  return (
    <>
      <ServiceTitile
        title="Featured Doctors"
        colored="Services"
        sx = {
          {
            mb: 10,
            color: "#0f8383"
          }
        }
      />
      <Swiper
        //   slidesPerView={3}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          788: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1170: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1600: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        //   spaceBetween={30}
        slidesPerGroup={1}
        grabCursor={true}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        //   navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper swipers"
      >
        {doctors.map((doctor) => (
          <SwiperSlide className="swipersSlider mb-10">
            <div className="flex flex-col items-center p-8 transition-colors duration-300 transform border border-teal-600 cursor-pointer rounded-xl hover:border-transparent group hover:bg-teal-600 w-full h-full relative" >
              <img
                className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                src={doctor.img}
                alt=""
              />

              <h1 class="mt-4 text-lg font-semibold text-teal-800 capitalize group-hover:text-white">
                {doctor.doctorName}
              </h1>

              <p class="mt-2  capitalize text-gray-600 group-hover:text-white ">
                {doctor.degree}
              </p>
              <p class="mt-2  capitalize text-gray-600 group-hover:text-white font-bold">
                {doctor.department}
              </p>

              <div class="flex  mt-3 -mx-2 absolute bottom-10">
                <Link to={`doctor/${doctor?._id}`}>
                  <Tooltip title="Details">
                    <IconButton>
                      <RiArrowRightCircleFill className="group-hover:text-white text-teal-600 text-4xl" />
                    </IconButton>
                  </Tooltip>
                </Link>
                <Link>
                  <Tooltip title="Book Appointment">
                    <IconButton>
                      <RiAddCircleFill className="group-hover:text-white text-teal-600 text-4xl" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default DoctorInHome;
