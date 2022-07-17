import { Swiper, SwiperSlide } from "swiper/react";
import { truncateWords, NumberFormat } from "../../utils/Truncate";
import { Pagination, Autoplay } from "swiper"; 
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { BsShareFill } from "react-icons/bs";
import { GoFlame } from "react-icons/go"; 
import { AiOutlineHeart } from "react-icons/ai";
import { Interact } from "./Interact";

const HomeWidgets = ({ title, homeListing,likeListings, winCardWidth, dispatch }) => {
  const swiperParams = {
    spaceBetween: 15,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    modules: [Autoplay, Pagination],
    pagination: { clickable: true, dynamicBullets: true },
    slidesPerView: 4,
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      500: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
      0: {
        slidesPerView: 1.6,
        spaceBetween: 10,
      },
    },
  };
  if(!homeListing){
    return null
  }

  return (
    <section className="px-5 mb-3">
      <div className="px-0 flex items-center justify-between w-full">
        <h3 className="font-bold text-xl text-cloud-theme-blue mb-2">
          {title}
        </h3>
      </div>
      <Swiper {...swiperParams}>
        {homeListing && homeListing.length > 0
          ? homeListing.map((listing, index) => {
              return (  
                <SwiperSlide key={index}>
                  <div className="pt-3 pl-0 pb-2 overflow-hidden">
                  <Interact listing={listing} dispatch={dispatch} likeListings={likeListings} />

                    <div className="p-2 pt-2 md:h-32 h-28 text-sm md:text-base rounded-lg dark:shadow-darkShadow shadow-lg z-10 opacity-100 bg-white dark:bg-cloud-theme-dark dark:text-white relative -top-6">
                      <Link href={`/listings/more-info/${listing.slug}`}>
                        <a>
                          <p className=" text-opacity-0 mb-1">
                            {winCardWidth >= 768
                              ? truncateWords(listing.title, 48)
                              : winCardWidth >= 640 && winCardWidth < 768
                              ? truncateWords(listing.title, 60)
                              : winCardWidth >= 600 && winCardWidth < 640
                              ? truncateWords(listing.title, 50)
                              : winCardWidth >= 500 && winCardWidth < 600
                              ? truncateWords(listing.title, 40)
                              : winCardWidth >= 400 && winCardWidth < 500
                              ? truncateWords(listing.title, 55)
                              : truncateWords(listing.title, 37)}
                          </p>
                          <div className="flex justify-between font-bold">
                            {listing.category?.category_name === "For Sale" ? (
                              <p className="">
                                KES {NumberFormat(listing.selling_price)}
                              </p>
                            ) : listing.category?.category_name ===
                              "For Rent" ? (
                              listing.rental_price && (
                                <p className="">
                                  KES {NumberFormat(listing.rental_price)}
                                </p>
                              )
                            ) : (
                              ""
                            )}
                            {listing.is_negotiable ? (
                              <p className="text-xs">negotiable</p>
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="flex justify-between content-center items-center py-1.5 mt-0">
                            <p className="text-cloud-theme-blue text-sm flex place-content-center">
                              <IoLocationSharp className="mt-[0.188rem] text-sm" />
                              {truncateWords(listing.location_description, 15)}
                            </p>
                            {parseFloat(listing.property_size) > 0.0 && (
                              <p className="text-blue-500 ">
                                {NumberFormatAcres(listing.property_size)}<span className="text-xs">(acres)</span>
                              </p>
                            )}
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          : [1, 2, 3, 4, 5].flatMap((_, index) => (
              <SwiperSlide key={index}>
                <div className="animate-pulse">
                  <div className="h-64 rounded-t-xl overflow-hidden relative">
                    <div className="bg-gray-300 w-full h-full"></div>
                  </div>

                  <div
                    className="
                        p-3
                        rounded-lg
                        shadow-lg
                        z-10
                        opacity-100
                        bg-white

                        relative
                        -top-6
                        h-32
                      "
                  >
                    <p className="bg-gray-300 p-2 my-2.5 rounded-md w-8/12"></p>
                    <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                      <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                      <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                    </div>
                    <div className="flex justify-between mb-2 content-center items-center pt-0 pb-1">
                      <p className="p-2 w-7/12 mr-6 bg-gray-300 rounded-md"></p>
                      <p className="p-2 w-7/12 bg-gray-300 rounded-md"></p>
                    </div>
                    <p className="bg-gray-300 p-2 mb-10 rounded-md w-9/12"></p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
};

export default HomeWidgets;
