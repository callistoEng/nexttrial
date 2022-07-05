import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import img from "../images/twi2.jpg";
import { IoLocationSharp } from "react-icons/io5";
import L from "leaflet";
import marker from "../images/main2.gif";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getResidentialListings,
  getCommercialListings,
  getLandListings,
} from "../../state/actionCreators/listings";
import {
  failedGetingLandListing,
  failedGetingCommercialListing,
  failedGetingResidentialListing,
} from "../../state/estateSlices/allListingSlices";
import { SpinOne } from "../Spinners/Spinner";
import { AiFillWechat, AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
const AgentDashBoard = () => {
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const dispatch = useDispatch();
  console.log(`the bed ${bedrooms} and the bathroom is ${bathrooms} now`);
  const singleEstablishmentListings = useSelector(
    (state) => state.listings.singleEstablishmentListings
  );
  const coWorkingEstablishmentListings = useSelector(
    (state) => state.listings.coWorkingEstablishmentListings
  );
  const multiEstablishmentListings = useSelector(
    (state) => state.listings.multiEstablishmentListings
  );
  return (
    <section className="px-0 md:px-10 mt-[5.2rem]">
      <div className="flex gap-1 flex-col md:flex-row md:h-[30rem]">
        <div className="w-full h-[70vh] relative">
          <MapContainer
            center={[-1.26538479248, 36.81293735403939]}
            zoom={7}
            scrollWheelZoom={true}
            // bounds={bounds}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              noWrap={true}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {[1, 2, 3, 4].flatMap((listing, index) => (
              <ListingMarkerView listing={listing} index={index} />
            ))}
            <AddMarker />
          </MapContainer>
        </div>
        <div className="md:h-full grid gap-2 grid-rows-2 w-96 px-3 py-2">
          <div className="md:h-full h-60">
            <img src={img} className="h-full w-full" />
          </div>
          <div className="md:h-full">
            <h3 className="font-bold">About Me</h3>
            <div className="text-sm">
              <p>
                ejkwfbe fiweuf wfuwie fwigu wegiw egwiuweg wiegw egiweguwig
                wguweigw ig wug weigu
              </p>
              <p>
                ejkwfbe fiweuf wfuwie fwigu wegiw egwiuweg wiegw egiweguwig
                wguweigw ig wug weigu
              </p>
              <p>
                ejkwfbe fiweuf wfuwie fwigu wegiw egwiuweg wiegw egiweguwig
                wguweigw ig wug weigu
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex md:flex-row flex-col md:px-0 px-4 gap-10 w-full">
        <div className=" w-full">
          <div className="mt-2">
            <div className="text-xl font-bold mb-5">
              <h4>Agent Stats</h4>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 mt-2 gap-4 gap-y-10">
            <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 sc md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Sold</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Fully Let</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Total Listings</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Residential</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Commercial</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Land</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="text-xl font-bold mb-5">
              <h4>Developer Stats</h4>
            </div>
            <div className="grid grid-cols-3 grid-rows-2 mt-2 gap-2 md:gap-4 gap-y-10">
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Completed Projects</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Fully Sold Out</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Polline Projects</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Property Types</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Financing</p>
                </div>
              </div>
              <div className="relative w-full hover:shadow-2xl h-full shadow-lg py-3 md:py-5 hover:scale-y-110 hover:-translate-y-2 duration-300">
                <div>
                  <p className="w-5 rounded-full absolute left-3 top-2 h-5 bg-cloud-theme-gold"></p>
                </div>
                <div className="w-full py-2 md:px-0 px-1 flex flex-col items-center content-center justify-between h-full">
                  <h4 className="font-semibold md:text-2xl text-xl md:mb-5 mb-3 md:mt-4 mt-2 ">80</h4>
                  <p>Locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[35rem] h-screen">
          <div
            className="
          shadow-lg
          mt-4
          p-4
          pt-0           
          rounded-lg
          border-2 border-cloud-theme-blue
        "
          >
            <div className="px-0 py-4">
              <div className="flex justify-center items-center content-center">
                <img src={img} alt="" className="rounded-full h-16 w-16 mb-3" />
              </div>

              <div className="pb-2 dark:border-cloud-theme-blue">
                <div className="flex flex-col justify-center w-64 m-auto dark:text-white">
                  <Link
                    to="#"
                    className="
                        w-full
                        py-1
                        px-3
                        mb-0
                        bg-cloud-theme-blue
                        text-white text-center text-base
                        flex justify-center items-center content-center
                        "
                  >
                    <BsFillTelephoneFill className="mt-1.5 mr-5 text-sm text-white" />{" "}
                    My Contact
                  </Link>
                  <p className="mb-3 text-center">or</p>
                  <Link
                    to="#"
                    className="
                  w-full
                  py-1
                  px-3
                  mb-0
                  text-center text-base
                  border-2 border-cloud-theme-blue
                  text-cloud-theme-blue
                  dark:text-white
                  flex justify-center items-center content-center
                "
                  >
                    <AiFillWechat className="mt-1.5 mr-5 text-lg" />
                    My Messages
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="md:mt-5 mt-7">
            <div className="border-b-2">
              <h4 className="font-semibold text-lg">Reviews and Comments</h4>
            </div>
            <div>
              <div className="mb-3 mt-2">
                <p className="font-medium">Some name</p>
                <p>Some comments by registered users on listing and comments</p>
              </div>
              <div className="mb-3">
                <p className="font-medium">Some name</p>
                <p>Some comments by registered users on listing and comments</p>
              </div>
              <div className="mb-3">
                <p className="font-medium">Some name</p>
                <p>Some comments by registered users on listing and comments</p>
              </div>
              <div className="mb-3">
                <p className="font-medium">Some name</p>
                <p>Some comments by registered users on listing and comments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div>
          <h5>My Listings</h5>
        </div>
        <div cla></div>
      </div>
      <div className="mt-96 h-screen bg-black"></div>
    </section>
  );
};
const AddMarker = () => {
  const [position, setPosition] = useState(null);
  const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: [2, 2],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [25, 25],
    className: "leaflet-div-icon",
  });
  useMapEvents({
    click: (e) => {
      setPosition(e.latlng); // 👈 add marker
      console.log(position);
      /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={myIcon}></Marker>
  );
};

// const ListingSlide = ({ listing }) => {
//   return (
//     <div className="pl-3">
//       <Link to={`/listings/more-info/${listing.properties.slug}`}>
//         <div className="h-36 rounded-t-lg overflow-hidden relative">
//           <img
//             src={listing.properties.Images[0]?.images}
//             alt=""
//             className="w-full h-full"
//           />
//           <div className="absolute top-3 left-3 bg-white py-0.5 px-1.5 rounded-sm">
//             <p className="font-semibold text-xs">SALE</p>
//           </div>
//         </div>
//         <div className="p-2 pt-1 rounded-md shadow-lg z-10 opacity-100 bg-white relative -top-6">
//           <p className="text-xs text-opacity-0 mb-1">
//             {listing.properties.title.substring(0, 28)}...
//           </p>
//           <div className="flex justify-between font-bold">
//             <p className="text-xs">KSh {listing.properties.price}</p>
//             <p className="text-xs">negotiable</p>
//           </div>
//           <div className="flex justify-between content-center items-center py-1 mt-0">
//             <p className="text-cloud-theme-blue text-xs flex place-content-center">
//               <IoLocationSharp className="mt-0.5 text-xs" />
//               {listing.properties.location_description.substring(0, 5)}..
//             </p>
//             <p className="text-cloud-theme-blue text-xs">
//               {listing.properties.property_size}m<sup>2</sup>
//             </p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

const ListingMarkerView = ({ listing, index }) => {
  const myIcon22 = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: [2, 2],
    popupAnchor: [0, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [30, 30],
    className: "leaflet-div-icon",
  });
  return (
    <>
      <Marker position={[36.3, 2.22]} key={index} icon={myIcon22}>
        <Popup>
          <div className="p-0 rounded-lg mt-0 w-60 h-full">
            <Link to={`/listings/more-info/ggsg`}>
              <div className="h-40 rounded-t-lg overflow-hidden relative">
                <img src={img} alt="" className="w-full h-full" />
                <div className="absolute top-3 left-3 bg-white py-1 px-4 rounded-sm">
                  <p className="font-semibold text-xs">SALE</p>
                </div>
              </div>
              <div className="p-2 pt-1 rounded-md z-10 opacity-100 bg-white relative -top-6">
                <p className="text-sm text-opacity-0 mb-1">A 3 Bedroom House</p>
                <div className="flex justify-between font-bold">
                  <p className="text-xs">KES 30,000</p>
                  <p className="text-xs">negotiable</p>
                </div>
                <div className="flex justify-between content-center items-center py-1 mt-0">
                  <p className="text-cloud-theme-blue text-xs flex place-content-center">
                    <IoLocationSharp className="mt-0.5 text-xs" />
                    Kileleshwa
                  </p>
                  <p className="text-cloud-theme-blue text-xs">
                    300m <sup>2</sup>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </Popup>
        <Tooltip>Some title</Tooltip>
      </Marker>
    </>
  );
};

export default AgentDashBoard;
