import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { FaAngleDown, FaAngleUp, FaLeaf } from "react-icons/fa";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { GiSteamBlast } from "react-icons/gi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { SpinMadoido, SpinOne, SpinThree } from "../Spinners/Spinner";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { TrackpageView } from "../GAnalytics";
import "react-datepicker/dist/react-datepicker.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { BsWifi } from "react-icons/bs";
import { CgGym } from "react-icons/cg";
import {
  MdCancel,
  MdErrorOutline,
  MdOutlinePool,
  MdPets,
} from "react-icons/md";
import L from "leaflet";
import { Navigate, useParams } from "react-router-dom";
import marker from "../images/main2.gif";
import currentPosIcons from "../images/main3.gif";
import { loadUsers } from "../../state/actionCreators/auth";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { failedAddingImages, failedChangingPlan, failedGetingListingDetail } from "../../state/estateSlices/allListingSlices";
import {
  addListingImagesAndPlans,
  deleteListingImage,
  editListings,
  getASingleListingDetail,
} from "../../state/actionCreators/listings";
import Addresses from "./Addresses";

const EditListings = () => {
  const [position, setPosition] = useState(null)
  const [mapPos, setMapPos] = useState({ lat: -1.286389, lng: 36.817223 })
  const mapRef = useRef();
  const dispatch = useDispatch();
  
  // const currentListingPosIcon = new L.Icon({
  //   iconUrl: currentPosIcons,
  //   iconRetinaUrl: currentPosIcons,
  //   iconAnchor: [2, 2],
  //   popupAnchor: null,
  //   shadowUrl: null,
  //   shadowSize: null,
  //   shadowAnchor: null,
  //   iconSize: [25, 25],
  //   className: "leaflet-div-icon",
  // });
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getASingleListingDetail(slug));
    dispatch(loadUsers());
    TrackpageView(`/listings/edit/${slug}`)
    return () => {
      dispatch(failedGetingListingDetail());
      dispatch(failedChangingPlan());
      dispatch(failedAddingImages())
    };
  }, [slug, dispatch]);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const listing = useSelector((state) => state.listings.listingDetail);
  const addingImages = useSelector((state) => state.listings.addingImages);
  const changingPlan = useSelector((state) => state.listings.changingPlan);
  const addingImagesMessage = useSelector(
    (state) => state.listings.addingImagesMessage
  );
  const changingPlanMessage = useSelector(
    (state) => state.listings.changingPlanMessage
  );
  const addListingloading = useSelector(
    (state) => state.listings.addListingloading
  );
  const listingAdded = useSelector((state) => state.listings.listingAdded);
  
  if (listingAdded) {  
    return <Navigate to="/auth/agent/dashboard" />;
  }
  const handleMapClick = (e) => {
    const latjs = e.latLng.toJSON();
    setMapPos(latjs);
    setPosition([mapPos.lat, mapPos.lng]);
  };
  return (
    <section className="mt-[6rem] pb-10">
      <div className="md:w-[35rem] mb-5 xs-l:w-[30rem] xs-l:p-0 p-5 w-full mx-auto">
        <h3 className="font-bold text-cloud-theme-blue text-center text-lg">
          Edit Listing
        </h3>
      </div>
      {listing ? (
        <UpdateListingComponent
          // currentListingPosIcon={currentListingPosIcon}
          addListingloading={addListingloading}
          deleteListingImage={deleteListingImage}
          listing={listing}
          addingImages={addingImages}
          changingPlan={changingPlan}
          addingImagesMessage={addingImagesMessage}
          changingPlanMessage={changingPlanMessage}
          dispatch={dispatch}
          mapPos={mapPos}
          handleMapClick={handleMapClick}
          onLoad={onLoad}
        />
      ) : (
        <div className="h-96">
          <SpinOne />
        </div>
      )}
    </section>
  );
};

const UpdateListingComponent = ({
  dispatch,
  addListingloading,
  currentListingPosIcon,
  deleteListingImage,
  listing,
  setMapPos,
  addingImages,
  changingPlan,
  mapPos,
  onLoad,
  addingImagesMessage,
  changingPlanMessage,
}) => {
  const [wifi, setWifi] = useState(listing.properties.has_wifi);
  const [stepOneErr, setStepOneErr] = useState(false);
  const [stepTwoErr, setStepTwoErr] = useState(false);
  const [stepThreeErr, setStepThreeErr] = useState(false);
  const [planImage, setPlanImage] = useState(false);
  const [planImageErr, setPlanImageErr] = useState(false);
  const [sauna, setSauna] = useState(listing.properties.has_sauna);
  const [negotiable, setNegotiable] = useState(
    listing.properties.is_negotiable
  );
  const [gym, setGym] = useState(listing.properties.has_gym);
  const [garden, setGarden] = useState(listing.properties.has_garden);
  const [pet, setPet] = useState(listing.properties.is_petfriendly);
  const [propImages, setPropImages] = useState(listing.properties.Images);
  const [pool, setPool] = useState(listing.properties.has_swiming_pool);
  const [step, setStep] = useState(1);
  const [imgs, setImgs] = useState(null);
  const [imgsErr, setImgsErr] = useState(null);
  const [imagePrevList, setImagePrevList] = useState([]);
  const [sellingPrice, setSellingPrice] = useState(
    listing.properties.selling_price
  );
  const [date, setDate] = useState(listing.properties.year);
  const [dateErr, setDateErr] = useState();
  const [sellingPriceErr, setSellingPriceErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [serviceCost, setServiceCost] = useState(
    listing.properties.service_cost
  );
  const [leasePrice, setLeasePrice] = useState(listing.properties.lease_price);
  const [leasePriceErr, setLeasePriceErr] = useState("");
  const [rentPrice, setRentPrice] = useState(listing.properties.rental_price);
  const [rentPriceErr, setRentPriceErr] = useState("");
  const [title, setTitle] = useState(listing.properties.title);
  const [titleErr, setTitleErr] = useState("");
  const [deposit, setDeposit] = useState(listing.properties.deposit);
  const [popertySize, setPropertySize] = useState(
    listing.properties.property_size
  );
  const [popertySizeErr, setPropertySizeErr] = useState("");
  const [livingArea, setLivingArea] = useState(listing.properties.living_area);
  const [areaToLet, setAreaToLet] = useState(listing.properties.area_to_let);
  const [numberOfStories, setNumberOfStories] = useState(
    listing.properties.no_of_stories
  );
  const [buildingClass, setBuildingClass] = useState(
    listing.properties.building_class
  );
  const [buildingClassErr, setBuildingClassErr] = useState("");
  const [buildingSize, setBuildingSize] = useState(
    listing.properties.building_size
  );
  const [buildingSizeErr, setBuildingSizeErr] = useState("");
  const [parkingRatio, setParkingRatio] = useState(
    listing.properties.parking_ratio
  );
  const [occupancy, setOccupancy] = useState(
    listing.properties.current_occupancy
  );
  const [avgMontlyCost, setAvgMontlyCost] = useState(
    listing.properties.avg_monthly_cost
  );
  const [avgRentalIncome, setAvgRentalIncome] = useState(
    listing.properties.avg_monthly_rental_income
  );
  const [rentMultiplier, setRentMultiplier] = useState(
    listing.properties.gross_rent_multiplier
  );
  const [existingTenants, setExistingTenants] = useState(
    listing.properties.existing_tenants
  );
  const [plotSize, setPlotSize] = useState(listing.properties.size_of_plots);
  const [plotSizeErr, setPlotSizeErr] = useState("");
  const [position, setPosition] = useState(null);
  // const [currentPosition, setCurrentPosition] = useState([ the original from db
  //   listing.geometry.coordinates[0],
  //   listing.geometry.coordinates[1],
  // ]);
  const [currentPosition, setCurrentPosition] = useState({
    lat:listing.geometry.coordinates[1],
    lng:listing.geometry.coordinates[0],
});

  // const [orgPosition, setOrgPosition] = useState([
  //   listing.geometry.coordinates[1],
  //   listing.geometry.coordinates[0],
  // ]);
  
  const [positionErr, setPositionErr] = useState(null);
  const [numberOfPlots, setNumberOfPlots] = useState(
    listing.properties.number_of_plots
  );
  const [numberOfPlotsErr, setNumberOfPlotsErr] = useState("");
  const [pricePerPlot, setPricePerPlot] = useState(
    listing.properties.price_per_plot
  );
  const [areaZoning, setAreaZoning] = useState(listing.properties.area_zonning);
  const [category, setCategory] = useState(
    listing.properties.category?.category_name
  );
  const [categoryAccordion, setCategoryAccordion] = useState(false);
  const [propCategoryTypeHeight, setPropCategoryTypeHeight] = useState("0px");
  const [propTypeAccordion, setPropTypeAccordion] = useState(false);
  const [property, setProperty] = useState(
    listing.properties.is_residential
      ? "residential"
      : listing.properties.is_land
      ? "land"
      : "commercial"
  );
  const [propMainHeight, setPropMainHeight] = useState("0px");
  const [propAccordion, setPropAccordion] = useState(false);
  const [propertyType, setPropertyType] = useState(
    listing.properties.property_type
  );
  const [propertyTypeErr, setPropertyTypeErr] = useState("");
  const [propTypeHeight, setPropTypeHeight] = useState("0px");
  const [roomsHeight, setRoomsHeight] = useState("0px");
  const [roomsAccordion, setRoomsAccordion] = useState(false);
  const [locationsHeight, setLocationsHeight] = useState("0px");
  const [priceAccordion, setPriceAccordion] = useState(false);
  const [priceHeight, setPriceHeight] = useState("0px");
  const [perksAccordion, setPerksAccordion] = useState(false);
  const [perksHeight, setPerksHeight] = useState("0px");
  const [locationsAccordion, setlocationsAccordion] = useState(false);
  const [bedrooms, setBedrooms] = useState(listing.properties.bedrooms);
  const [bedroomsErr, setBedroomsErr] = useState("");
  const [bathrooms, setBathrooms] = useState(listing.properties.bathrooms);
  const [bathroomsErr, setBathroomsErr] = useState("");
  const [soldBy, setSoldBy] = useState(listing.properties.sold_by);
  const [soldByErr, setSoldByErr] = useState("");
  const [garages, setGarages] = useState(listing.properties.garages);
  const [livingRooms, setLivingRooms] = useState(
    listing.properties.living_rooms
  );
  const [livingRoomsErr, setLivingRoomsErr] = useState("");
  const [diningRooms, setDiningRooms] = useState(
    listing.properties.dining_rooms
  );
  const [diningRoomsErr, setDiningRoomsErr] = useState("");
  const [roomsErr, setRoomsErr] = useState("");
  const [meetingRooms, setMeetingRooms] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState(
    listing.properties.parking_spaces
  );
  const [parkingSpacesErr, setParkingSpacesErr] = useState("");
  const [description, setDescription] = useState(
    listing.properties.description
  );
  const [descriptionErr, setDescriptionErr] = useState("");
  const [depositErr, setDepositErr] = useState("");
  const [leaseTerms, setLeaseTerms] = useState(listing.properties.lease_term);
  const [leaseTermsErr, setLeaseTermsErr] = useState("");
  const [packages, setPackages] = useState("");
  const [otherFeatErr, setOtherFeatErr] = useState("");
  const [locationDescription, setLocationDescription] = useState(
    listing.properties.location_description
  );
  const [locationDescriptionErr, setLocationDescriptionErr] = useState("");
  const [developmentTypeHeight, setDevelopmentTypeHeight] = useState("0px");
  const [developmentType, setDevelopmentType] = useState(
    listing.properties.development_type
  );
  const [developmentTypeErr, setDevelopmentTypeErr] = useState("");
  const [developmentAccordion, setDevAccordion] = useState(false);
  const [financingTypeHeight, setFinancingTypeHeight] = useState("0px");
  const [financing, setFinancingType] = useState("");
  const [financingAccordion, setFinancingAccordion] = useState(false);
  const [dealsTypeHeight, setDealsTypeHeight] = useState("0px");
  const [dealsType, setDealsType] = useState("");
  const [dealAccordion, setDealAccordion] = useState(false);
  const [availability, setAvailability] = useState(
    listing.properties.listing_availability
  );
  const [availabilityErr, setAvailabilityErr] = useState("");
  const [availabilityAccordion, setAvailabilityAccordion] = useState(false);
  const [availabilityAccordionHeight, setAvailabilityAccordionHeight] =
    useState("0px");
  const [soldByAccordion, setSoldByAccordion] = useState(false);
  const [soldByAccordionHeight, setSoldByAccordionHeight] = useState("0px");
  const [existingImgsAccordion, setExistingImgsAccordion] = useState(false);
  const [existingImgsAccordionHeight, setexistingImgsAccordionHeight] =
    useState("0px");
  const [otherFeaturesHeight, setOtherFeaturesHeight] = useState("0px");
  const [otherFeaturesAccordion, setOtherFeaturesAccordion] = useState(false);
  const propertyTypeHeight = useRef(null);
  const propertyCategoryHeight = useRef(null);
  const propertyHeight = useRef(null);
  const roomHeight = useRef(null);
  const locationHeight = useRef(null);
  const costHeight = useRef(null);
  const perkHeight = useRef(null);
  const developmentHeight = useRef(null);
  const financingHeight = useRef(null);
  const dealTypeHeight = useRef(null);
  const otherFeaturesTypeHeight = useRef(null);
  const soldByHeight = useRef(null);
  const existingImgsHeight = useRef(null);
  const availabilityHeight = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries: ["places"],
    libraries: [`${process.env.REACT_APP_GOOGLE_MAPS_LIBS}`],
  });
  const handleMapClick = (e) => {
    const latjs = e.latLng.toJSON();
    setCurrentPosition(latjs);
    setPosition([currentPosition.lat, currentPosition.lng]);
  };

  const imageHandler = (e) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePrevList((prevImages) => prevImages.concat(fileList));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
    setImgs({ images: e.target.files });
  };
  const removeImage = (image) => {
    const newList = imagePrevList;
    // newList.splice(imagePrevList.indexOf(image),1)
    setImagePrevList(newList);
  };
  const showImages = (source) => {
    return source.flatMap((img, index) => {
      return (
        <div className="w-full h-28 relative shadow-md" key={index}>
          <img
            className="w-full h-full object-cover"
            src={img}
            key={img}
            alt=""
          />
          {/* <div
            onClick={() => removeImage(img)}
            className="absolute top-2 right-2 rounded-full p-1.5 bg-white shadow-md"
          >
            <MdCancel />
          </div> */}
        </div>
      );
    });
  };
  const showExistingImages = (source) => {
    return source.flatMap((img, index) => {
      return (
        <div
          className="w-full sm:h-28 h-[6rem] relative shadow-md hover:shadow-lg border"
          key={index}
        >
          <img
            className="w-full h-full object-cover overflow-hidden "
            src={img.images}
            key={img.id}
            alt={listing.properties.title}
          />
          <div
            onClick={() =>
              dispatch(deleteListingImage(img.id, listing.properties.slug))
            }
            className="absolute top-2 right-2 rounded-full p-1.5 bg-white shadow-md"
          >
            <MdCancel />
          </div>
        </div>
      );
    });
  };
  const togglePropertyCategory = () => {
    setCategoryAccordion(categoryAccordion === false ? true : false);
    setPropCategoryTypeHeight(
      !categoryAccordion
        ? `${propertyCategoryHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const toggleProperty = () => {
    setPropAccordion(propAccordion === false ? true : false);
    setPropMainHeight(
      !propAccordion ? `${propertyHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleRooms = () => {
    setRoomsAccordion(roomsAccordion === false ? true : false);
    setRoomsHeight(
      !roomsAccordion ? `${roomHeight.current.scrollHeight}px` : "0px"
    );
  };
  const togglePrice = () => {
    setPriceAccordion(priceAccordion === false ? true : false);
    setPriceHeight(
      !priceAccordion ? `${costHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleExistingImgs = () => {
    setExistingImgsAccordion(existingImgsAccordion === false ? true : false);
    setexistingImgsAccordionHeight(
      !existingImgsAccordion
        ? `${existingImgsHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const toggleSoldBy = () => {
    setSoldByAccordion(soldByAccordion === false ? true : false);
    setSoldByAccordionHeight(
      !soldByAccordion ? `${soldByHeight.current.scrollHeight}px` : "0px"
    );
  };
  const togglePerks = () => {
    setPerksAccordion(perksAccordion === false ? true : false);
    setPerksHeight(
      !perksAccordion ? `${perkHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleListingLoacation = () => {
    setlocationsAccordion(locationsAccordion === false ? true : false);
    setLocationsHeight(
      !locationsAccordion ? `${locationHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleAvailability = () => {
    setAvailabilityAccordion(availabilityAccordion === false ? true : false);
    setAvailabilityAccordionHeight(
      !availabilityAccordion
        ? `${availabilityHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const togglePropertyType = () => {
    setPropTypeAccordion(propTypeAccordion === false ? true : false);
    setPropTypeHeight(
      !propTypeAccordion
        ? `${propertyTypeHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const toggleDevelopmentType = () => {
    setDevAccordion(developmentAccordion === false ? true : false);
    setDevelopmentTypeHeight(
      !developmentAccordion
        ? `${developmentHeight.current.scrollHeight}px`
        : "0px"
    );
  };
  const toggleFinancing = () => {
    setFinancingAccordion(financingAccordion === false ? true : false);
    setFinancingTypeHeight(
      !financingAccordion ? `${financingHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleDealType = () => {
    setDealAccordion(dealAccordion === false ? true : false);
    setDealsTypeHeight(
      !dealAccordion ? `${dealTypeHeight.current.scrollHeight}px` : "0px"
    );
  };
  const toggleOtherFeatures = () => {
    setOtherFeaturesAccordion(otherFeaturesAccordion === false ? true : false);
    setOtherFeaturesHeight(
      !otherFeaturesAccordion
        ? `${otherFeaturesTypeHeight.current.scrollHeight}px`
        : "0px"
    );
  };

  const user = useSelector((state) => state.auth.user);
  const processNumbers = (number) => {
    if (number) {
      if (parseFloat(number) >= 0.0) {
        if (number.length > 14) {
          alert("Some number values greater that 14");
        }
        const intNos = parseFloat(number);
        const nos = intNos.toFixed(3);
        return nos;
      } else {
        return 0.0;
      }
    }
    return 0.0;
  };
  const processNumberIntegers = (number) => {
    if (number) {
      if (parseInt(number) >= 0) {
        if (number.length > 14) {
          alert("Some numbers longer than 14 digits");
        }
        const intNos = parseInt(number);
        return intNos;
      } else {
        return 0;
      }
    }
    return 0;
  };
  const processDate = (date) => {
    if (date) {
      const dateInt = parseInt(date);
      if (Number.isInteger(dateInt)) {
        if (dateInt > 2022) {
          return null;
        } else if (dateInt < 1960) {
          return null;
        }
      } else {
        return null;
      }
    }
    return null;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    if (!position) {
      formData.append("location", [listing.geometry.coordinates[1],listing.geometry.coordinates[0]]);
    } else {
      formData.append("location", position);
    }

    formData.append("listing_availability", availability);
    formData.append("sold_by", soldBy);
    formData.append("listing_id", listing.properties.listing_id);
    formData.append("description", description);
    formData.append("location_description", locationDescription);
    formData.append("is_negotiable", negotiable);
    formData.append("property", property);
    formData.append("agent_id", user.id);
    if (property === "residential") {
      formData.append("selling_price", processNumbers(sellingPrice));
      if (category === "For Rent") {
        formData.append("category_id", 2);
      } else if (category === "For Sale") {
        formData.append("category_id", 3);
      } else {
        formData.append("category_id", 3);
      }
      setStepOneErr("");
      formData.append("year", date);
      formData.append("financing_type", financing);
      formData.append("property_type", propertyType);
      formData.append("development_type", developmentType);
      formData.append("deal_type", dealsType);
      formData.append("service_cost", processNumberIntegers(serviceCost));
      formData.append("property_size", processNumbers(popertySize));
      formData.append("living_area", processNumbers(livingArea));
      formData.append("bedrooms", processNumberIntegers(bedrooms));
      formData.append("bathrooms", processNumberIntegers(bathrooms));
      formData.append("rental_price", processNumbers(rentPrice));
      formData.append("has_wifi", wifi);
      formData.append("has_sauna", sauna);
      formData.append("is_petfriendly", pet);
      formData.append("has_swiming_pool", pool);
      formData.append("has_garden", garden);
      formData.append("has_gym", gym);
      formData.append("deposit", processNumbers(deposit));
      formData.append("dining_rooms", processNumberIntegers(diningRooms));
      formData.append("garages", processNumberIntegers(garages));
      formData.append("living_rooms", processNumberIntegers(livingRooms));
      formData.append("parking_spaces", processNumberIntegers(parkingSpaces));
      dispatch(editListings(formData));
      return;
    }
    if (property === "land") {
      setLeaseTermsErr("");
      setLeasePriceErr("");
      if (!plotSize) {
        setPlotSizeErr("This field is required");
        setStepOneErr("Error");
        return;
      }
      if (!numberOfPlots) {
        setStepOneErr("Error");
        setNumberOfPlotsErr("This field is required");
        return;
      }
      setSellingPriceErr("");
      setPriceErr("");
      setPlotSizeErr("");
      setNumberOfPlotsErr("");
      setStepOneErr("");
      if (category === "For Lease") {
        formData.append("category_id", 1);
      } else if (category === "For Sale") {
        formData.append("category_id", 3);
      } else {
        formData.append("category_id", 1);
      }
      formData.append("financing_type", financing);
      formData.append("property_size", processNumbers(popertySize));
      formData.append("number_of_plots", numberOfPlots);
      formData.append("size_of_plots", plotSize);
      formData.append("lease_price", processNumbers(leasePrice));
      formData.append("selling_price", processNumbers(sellingPrice));
      formData.append("property_type", propertyType);
      formData.append("financing_type", financing);
      formData.append("price_per_plot", processNumbers(pricePerPlot));
      setStepThreeErr("");
      dispatch(editListings(formData));
      return;
    }
    if (property === "commercial") {
      if (category === "For Sale") {
        if (!sellingPrice) {
          setSellingPriceErr("This field is required");
          setPriceErr("Some info is missing");
          setStepOneErr("Error! Selling price missing in step one");
          return;
        }
      }
      setSellingPriceErr("");
      setPriceErr("");
      if (category === "For Rent") {
        if (!rentPrice) {
          setRentPriceErr("This field is required");
          setPriceErr("Some info is missing");
          setStepOneErr("Error! Rental price missing in step one");
          return;
        }
        setRentPriceErr("");
      }
      setRentPriceErr("");
      setDepositErr("");
      setRoomsErr("");
      if (category === "For Rent") {
        formData.append("category_id", 2);
      } else if (category === "For Sale") {
        formData.append("category_id", 3);
      } else {
        formData.append("category_id", 2);
      }
      setStepThreeErr("");
      formData.append("selling_price", processNumbers(sellingPrice));
      formData.append("year", processDate(date));
      formData.append("development_type", developmentType);
      formData.append("property_size", processNumbers(popertySize));
      formData.append("rental_price", processNumbers(rentPrice));
      formData.append("property_type", propertyType);
      formData.append("parking_spaces", processNumberIntegers(parkingSpaces));
      formData.append("parking_ratio", parkingRatio);
      formData.append("gross_rent_multiplier", rentMultiplier);
      formData.append("existing_tenants", existingTenants);
      formData.append("avg_monthly_rental_income", avgRentalIncome);
      formData.append("current_occupancy", occupancy);
      formData.append("avg_monthly_cost", avgMontlyCost);
      formData.append("area_to_let", processNumbers(areaToLet));
      formData.append("no_of_stories", processNumberIntegers(numberOfStories));
      formData.append("building_class", buildingClass);
      formData.append("building_size", buildingSize);
      dispatch(editListings(formData));
      return;
    }
  };
  const haddleAddImages = () => {
    const formData = new FormData();
    const id = 1;
    const planChange = false;
    if (imgs) {
      for (let file of imgs.images) {
        formData.append("Images", file);
      }
      formData.append("isPlan", false);
      dispatch(
        addListingImagesAndPlans(
          planChange,
          id,
          listing.properties.slug,
          formData
        )
      );
    } else {
      return;
    }
  };
  const handleChangePlan = () => {
    const formData = new FormData();
    const id = 1;
    const planChange = true;
    if (planImage) {
      formData.append("house_plan", planImage[0]);
      formData.append("isPlan", true);
      dispatch(
        addListingImagesAndPlans(
          planChange,
          id,
          listing.properties.slug,
          formData
        )
      );
    }
  };
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-5 w-full md-xls:w-10/12 md-xls:px-0 mx-auto">
      <form
        className="md-xls:p-5 py-4 col-span-2 w-full mx-auto"
        onSubmit={onSubmit}
      >
        <div className="flex relative justify-between mb-5">
          <div className="flex justify-between z-20 items-center">
            <div className="relative flex flex-col items-center">
              <div
                className={
                  step === 1 && stepOneErr
                    ? `rounded-full transition duration-300 ease-in-out
                     h-8 w-8 flex items-center justify-center 
                    bg-red-600 text-white`
                    : `rounded-full transition duration-300 ease-in-out
                      h-8 w-8 flex items-center justify-center 
                      bg-cloud-theme-blue text-white`
                }
              >
                {step === 1 ? (
                  1
                ) : stepOneErr ? (
                  <MdErrorOutline className="text-xl text-red-600" />
                ) : (
                  1
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between z-20 items-center">
            <div className="relative flex flex-col items-center text-cloud-theme-blue">
              <div
                className={
                  step === 2 && stepTwoErr
                    ? `rounded-full transition duration-300 ease-in-out
                  h-8 w-8 flex items-center justify-center 
                 bg-red-600 text-white`
                    : `rounded-full transition duration-300 ease-in-out
                   h-8 w-8 flex items-center justify-center 
                   bg-cloud-theme-blue text-white`
                }
              >
                {step === 2 ? (
                  2
                ) : stepTwoErr ? (
                  <MdErrorOutline className="text-xl text-red-600" />
                ) : (
                  2
                )}
              </div>
            </div>
          </div>

          <div className="flex-auto border-t-2 z-10 absolute w-full top-1/2 transition duration-300 ease-in-out"></div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <h4 className="text-black font-bold text-md underline">
            {step === 1
              ? "Key Features"
              : step === 2
              ? "Property Financing & Options"
              : ""}
          </h4>
        </div>
        {step === 1 ? (
          <>
            <div className="shadow-md px-3 py-2 mb-5">
              <div>
                <p className="font-semibold text-cloud-theme-blue text-lg">
                  Property Title
                </p>
                {titleErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {titleErr}
                  </p>
                )}
              </div>

              <div className="py-2">
                <input
                  type="text"
                  value={title}
                  maxLength={250}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                  placeholder="eg: 3 bedroom apartment, fully furnished "
                />
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleSoldBy}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Property Source
                  </p>
                  {soldByAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {soldByErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {soldByErr}
                  </p>
                )}
              </div>
              <div
                ref={soldByHeight}
                style={{ maxHeight: `${soldByAccordionHeight}` }}
                className="transition-max-height ease-in duration-300 pl-5"
              >
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="owner"
                      value="Owner"
                      checked={soldBy === "Owner"}
                      onChange={(e) => setSoldBy(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="owner"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Owner
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="dev"
                      value="Developer"
                      checked={soldBy === "Developer"}
                      onChange={(e) => setSoldBy(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="dev"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Developer
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="agent_"
                      value="Agent"
                      checked={soldBy === "Agent"}
                      onChange={(e) => setSoldBy(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="agent_"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Agent
                  </label>
                </div>
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={togglePropertyCategory}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Reason For Listing
                  </p>
                  {categoryAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
              <div
                ref={propertyCategoryHeight}
                style={{ maxHeight: `${propCategoryTypeHeight}` }}
                className="transition-max-height ease-in duration-300 pl-5"
              >
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="sale"
                      value="For Sale"
                      checked={category === "For Sale"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="sale"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    For Sale
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="rent"
                      value="For Rent"
                      checked={category === "For Rent"}
                      onChange={(e) => setCategory(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="rent"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    To Let
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="lease"
                      value="For Lease"
                      checked={category === "For Lease"}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setProperty("land");
                      }}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="lease"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    For Lease
                  </label>
                </div>
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleProperty}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Property Category
                  </p>
                  {propAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
              <div
                ref={propertyHeight}
                style={{ maxHeight: `${propMainHeight}` }}
                className="transition-max-height ease-in duration-300 pl-5"
              >
                <div className="pt-2"></div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="residential"
                      value="residential"
                      checked={property === "residential"}
                      onChange={(e) => setProperty(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="residential"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Residential
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="commercial"
                      value="commercial"
                      checked={property === "commercial"}
                      onChange={(e) => setProperty(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="commercial"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Commercial
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="land"
                      value="land"
                      checked={property === "land"}
                      onChange={(e) => setProperty(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="land"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Land
                  </label>
                </div>
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={togglePropertyType}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Property Type
                  </p>
                  {propTypeAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {propertyTypeErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {propertyTypeErr}
                  </p>
                )}
              </div>
              <div
                ref={propertyTypeHeight}
                style={{ maxHeight: `${propTypeHeight}` }}
                className="transition-max-height ease-in duration-300 pl-5"
              >
                <div className="pt-2"></div>
                {property === "residential" ? (
                  <>
                    <div>
                      <h5 className="font-semibold text-sm">
                        Property Types for Residential Properties
                      </h5>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Townhouse" className="w-full h-full">
                        Townhouse
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Townhouse"
                          value="Townhouse"
                          checked={propertyType === "Townhouse"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Studio" className="w-full h-full">
                        Studio
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Studio"
                          value="Studio"
                          checked={propertyType === "Studio"}
                          onChange={(e) => {
                            setPropertyType(e.target.value);
                            setBedrooms(0);
                          }}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Apartment" className="w-full h-full">
                        Apartment
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Apartment"
                          value="Apartment"
                          checked={propertyType === "Apartment"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="Furnished-Apartment"
                        className="w-full h-full"
                      >
                        Furnished-Apartment
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Furnished-Apartment"
                          value="Furnished-Apartment"
                          checked={propertyType === "Furnished-Apartment"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Maissonete" className="w-full h-full">
                        Maissonete
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Maissonete"
                          value="Maissonete"
                          checked={propertyType === "Maissonete"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Bungalow" className="w-full h-full">
                        Bungalow
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Bungalow"
                          value="Bungalow"
                          checked={propertyType === "Bungalow"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Duplex" className="w-full h-full">
                        Duplex
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Duplex"
                          value="Duplex"
                          checked={propertyType === "Duplex"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Beachfront" className="w-full h-full">
                        Beachfront Property
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Beachfront"
                          value="Beachfront"
                          checked={propertyType === "Beachfront"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Condo" className="w-full h-full">
                        Condo
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Condo"
                          value="Condo"
                          checked={propertyType === "Condo"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Penthouse" className="w-full h-full">
                        Penthouse
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Penthouse"
                          value="Penthouse"
                          checked={propertyType === "Penthouse"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                ) : property === "commercial" ? (
                  <>
                    <div>
                      <h5 className="font-semibold text-sm">
                        Property Types for Commercial Properties
                      </h5>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="Commercial-Offices"
                        className="w-full h-full"
                      >
                        Commercial Offices
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Commercial-Offices"
                          value="Commercial-Offices"
                          checked={propertyType === "Commercial-Offices"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Retail-Shops" className="w-full h-full">
                        Retail Shops
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Retail-Shops"
                          value="Retail-Shops"
                          checked={propertyType === "Retail-Shops"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Mall-Space" className="w-full h-full">
                        Mall Space
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Mall-Space"
                          value="Mall-Space"
                          checked={propertyType === "Mall-Space"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="Co-Working-Space"
                        className="w-full h-full"
                      >
                        Co-Working Space
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Co-Working-Space"
                          value="Co-Working-Space"
                          checked={propertyType === "Co-Working-Space"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Restaurant" className="w-full h-full">
                        Restaurant
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Restaurant"
                          value="Restaurant"
                          checked={propertyType === "Restaurant"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Hotel" className="w-full h-full">
                        Hotel
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Hotel"
                          value="Hotel"
                          checked={propertyType === "Hotel"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="School" className="w-full h-full">
                        School
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="School"
                          value="School"
                          checked={propertyType === "School"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Warehouse" className="w-full h-full">
                        Warehouse
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Warehouse"
                          value="Warehouse"
                          checked={propertyType === "Warehouse"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h5 className="font-semibold text-sm">
                        Land Suitable for
                      </h5>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="For-Commercial" className="w-full h-full">
                        For Commercial
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="For-Commercial"
                          value="For-Commercial"
                          checked={propertyType === "For-Commercial"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="For-Residential"
                        className="w-full h-full"
                      >
                        For Residential
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="For-Residential"
                          value="For-Residential"
                          checked={propertyType === "For-Residential"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="For-Joint-Venture"
                        className="w-full h-full"
                      >
                        For Joint Venture
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="For-Joint-Venture"
                          value="For-Joint-Venture"
                          checked={propertyType === "For-Joint-Venture"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Agricultural" className="w-full h-full">
                        Agricultural
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Agricultural"
                          value="Agricultural"
                          checked={propertyType === "Agricultural"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="institutional-development"
                        className="w-full h-full"
                      >
                        For Institutional Development
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="institutional-development"
                          value="institutional-development"
                          checked={propertyType === "institutional-development"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Recreational" className="w-full h-full">
                        Recreational
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Recreational"
                          value="Recreational"
                          checked={propertyType === "Recreational"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Industrial" className="w-full h-full">
                        Industrial
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Industrial"
                          value="Industrial"
                          checked={propertyType === "Industrial"}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleAvailability}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Property Availability
                  </p>
                  {availabilityAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {availabilityErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {availabilityErr}
                  </p>
                )}
              </div>
              <div
                ref={availabilityHeight}
                style={{ maxHeight: `${availabilityAccordionHeight}` }}
                className="transition-max-height ease-in duration-300 pl-5"
              >
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="FLEXIBLE"
                      value="FLEXIBLE"
                      checked={availability === "FLEXIBLE"}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="FLEXIBLE"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Flexible
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-1 py-2">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="IMMEDIATELY"
                      value="IMMEDIATELY"
                      checked={availability === "IMMEDIATELY"}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="IMMEDIATELY"
                    className="w-full md:text-sm text-xs h-full"
                  >
                    Immediately
                  </label>
                </div>
              </div>
            </div>
            {property === "residential" ? (
              <>
                <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                  <div>
                    <button
                      onClick={toggleDevelopmentType}
                      type="button"
                      className="flex w-full justify-between items-center mb-0 py-1"
                    >
                      <p className="font-semibold text-cloud-theme-blue text-lg">
                        Development Type
                      </p>
                      {developmentAccordion ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                    {developmentTypeErr && (
                      <p className="font-semibold text-red-600 text-xs">
                        {developmentTypeErr}
                      </p>
                    )}
                  </div>
                  <div
                    ref={developmentHeight}
                    style={{ maxHeight: `${developmentTypeHeight}` }}
                    className="transition-max-height ease-in duration-300 pl-5"
                  >
                    <div className="pt-2"></div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Stand-Alone" className="w-full h-full">
                        Stand-Alone
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Stand-Alone"
                          value="Stand-Alone"
                          checked={developmentType === "Stand-Alone"}
                          onChange={(e) => setDevelopmentType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label
                        htmlFor="Gated-Communities"
                        className="w-full h-full"
                      >
                        Gated Communities
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Gated-Communities"
                          value="Gated-Communities"
                          checked={developmentType === "Gated-Communities"}
                          onChange={(e) => setDevelopmentType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                      <label htmlFor="Mixed-Use" className="w-full h-full">
                        Mixed-Use
                      </label>
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="Mixed-Use"
                          value="Mixed-Use"
                          checked={developmentType === "Mixed-Use"}
                          onChange={(e) => setDevelopmentType(e.target.value)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                  <div>
                    <button
                      onClick={toggleRooms}
                      type="button"
                      className="flex w-full justify-between items-center mb-0 py-1"
                    >
                      <p className="font-semibold text-cloud-theme-blue text-lg">
                        Rooms
                      </p>
                      {roomsAccordion ? <FaAngleUp /> : <FaAngleDown />}
                    </button>
                    {roomsErr && (
                      <p className="font-semibold text-red-600 text-xs">
                        {roomsErr}
                      </p>
                    )}
                  </div>
                  <div
                    ref={roomHeight}
                    style={{ maxHeight: `${roomsHeight}` }}
                    className="transition-max-height ease-in duration-300 pl-0"
                  >
                    <div className="pt-2"></div>

                    <div className="grid grid-cols-2 md:grid-cols-3 pt-2 gap-2 pb-2">
                      {propertyType === "Studio" ? (
                        <div>
                        <h5 className="w-full mb-2">Studio</h5>
                        {bedroomsErr && (
                          <p className="font-semibold text-red-600 text-xs">
                            {bedroomsErr}
                          </p>
                        )}
                        <div className="relative">
                          <input
                            type="checkbox"
                            value={0}
                            checked={bedrooms == 0}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="opacity-0 absolute p-2 w-full h-full"
                          />
                          <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                              viewBox="0 0 24 24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path
                                fill="#FB911B"
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      ) :(
                        <>
                        <div className="">
                        <h5 className="w-full">Bedrooms</h5>
                        {bedroomsErr && (
                          <p className="font-semibold text-red-600 text-xs">
                            {bedroomsErr}
                          </p>
                        )}
                        <div className="">
                          <div className="pl-0 py-2">
                            <input
                              type="number"
                              min={1}
                              value={bedrooms}
                              onChange={(e) => setBedrooms(e.target.value)}
                              className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                            />
                          </div>
                        </div>
                      </div>
                          <div className="">
                            <h5 className="w-full">Bathrooms</h5>
                            {bathroomsErr && (
                              <p className="font-semibold text-red-600 text-xs">
                                {bathroomsErr}
                              </p>
                            )}
                            <div className="">
                              <div className="pl-0 py-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={bathrooms}
                                  onChange={(e) => setBathrooms(e.target.value)}
                                  className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <h5 className="w-full">Garages</h5>
                            <div className="">
                              <div className="pl-0 py-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={garages}
                                  onChange={(e) => setGarages(e.target.value)}
                                  className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <h5 className="w-full">Parking Spaces</h5>
                            {parkingSpacesErr && (
                              <p className="font-semibold text-red-600 text-xs">
                                {parkingSpacesErr}
                              </p>
                            )}
                            <div className="">
                              <div className="pl-0 py-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={parkingSpaces}
                                  onChange={(e) =>
                                    setParkingSpaces(e.target.value)
                                  }
                                  className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <h5 className="w-full">Dining Rooms</h5>
                            {diningRoomsErr && (
                              <p className="font-semibold text-red-600 text-xs">
                                {diningRoomsErr}
                              </p>
                            )}
                            <div className="">
                              <div className="pl-0 py-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={diningRooms}
                                  onChange={(e) =>
                                    setDiningRooms(e.target.value)
                                  }
                                  className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <h5 className="w-full">Living Rooms</h5>
                            {livingRoomsErr && (
                              <p className="font-semibold text-red-600 text-xs">
                                {livingRoomsErr}
                              </p>
                            )}
                            <div className="">
                              <div className="pl-0 py-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={livingRooms}
                                  onChange={(e) =>
                                    setLivingRooms(e.target.value)
                                  }
                                  className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <p className="font-semibold text-cloud-theme-blue text-lg">
                  Description
                </p>
                {descriptionErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {descriptionErr}
                  </p>
                )}
              </div>
              <div className="mt-2">
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  config={{
                    placeholder:
                      "Add extensive listing description here including services and features  not collected in the form",
                  }}
                  onReady={() => {}}
                  onChange={(event, editor) => setDescription(editor.getData())}
                />
              </div>
              {property === "residential" || property === "commercial" ? (
                <div className="mt-2">
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Year
                  </p>
                  {dateErr && (
                    <p className="font-semibold text-red-600 text-xs mb-3">
                      {dateErr}
                    </p>
                  )}
                  <input
                    maxLength={4}
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="
                    p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                    focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="Year of construction e.g 2019"
                  />
                  {/* <DatePicker
                    onChange={(date) => setDate(date)}
                    selected={date}
                    isClearable
                    closeOnScroll={true}
                    placeholderText="Required"
                    customInput={<DateCustom />}
                    className="border-cloud-theme-gold border"
                    dateFormat="yyyy/MM/dd"
                  /> */}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleListingLoacation}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Listing Location
                  </p>
                  {locationsAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {positionErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {positionErr}
                  </p>
                )}
              </div>
              <div
                ref={locationHeight}
                style={{ maxHeight: `${locationsHeight}` }}
                className="transition-max-height ease-in duration-300"
              >
                <div className="pt-2"></div>
                <div className="py-2">
                  <div className="mb-2">
                    <p className="font-semibold text-cloud-theme-blue">
                      Address
                    </p>
                    {locationDescription && <p className="font-semibold italic text-sm text-black">
                      {locationDescription} 
                    </p>}
                    {locationDescriptionErr && (
                      <p className="font-semibold text-red-600 text-xs">
                        {locationDescriptionErr}
                      </p>
                    )}
                  </div>
                  {isLoaded ?<Addresses
                    setPosition={setPosition}
                    setLocationDescription={setLocationDescription}
                    setMapPos={(position) => setCurrentPosition(position)}
                  />:""}
                </div>
                <div className="h-72 py-2">
                  <div className="mb-2">
                    <p className="font-semibold text-cloud-theme-blue">
                      Click on the map to add the property's geolocation
                    </p>
                    {positionErr && (
                      <p className="font-semibold text-red-600 text-xs">
                        {positionErr}
                      </p>
                    )}
                  </div>
                  <div className="h-[20rem] ">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerClassName="w-full h-full relative"
                        center={{
                          lat: currentPosition.lat,
                          lng: currentPosition.lng,
                        }}
                        onClick={(e) => handleMapClick(e)}
                        zoom={11}
                        options={{
                          clickableIcons: false,
                        }}
                        onLoad={onLoad}
                      >
                        {listing.geometry.coordinates && (
                          <Marker
                            position={{
                              lat: listing.geometry.coordinates[1],
                              lng: listing.geometry.coordinates[0],
                            }}
                          />
                        )}
                        {currentPosition && (
                          <Marker
                            position={{
                              lat: currentPosition.lat,
                              lng: currentPosition.lng,
                            }}
                          />
                        )}
                      </GoogleMap>
                    ) : (
                      <div className="h-16 sm:h-auto">
                        <p>Fetching map ...</p>
                      </div>
                    )}
                  </div>
                  {/* <MapContainer
                    center={currentPosition}
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      noWrap={true}
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {currentPosition ? (
                      <Marker
                        position={currentPosition}
                        icon={currentListingPosIcon}
                      ></Marker>
                    ) : (
                      ""
                    )}

                    <AddMarker position={position} setPosition={setPosition} />
                  </MapContainer> */}
                </div>
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={togglePrice}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Price (KES)
                  </p>
                  {priceAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {priceErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {priceErr}
                  </p>
                )}
              </div>
              <div
                ref={costHeight}
                style={{ maxHeight: `${priceHeight}` }}
                className="transition-max-height ease-in duration-300"
              >
                <div className="pt-2"></div>
                <div className="grid grid-cols-2 gap-2">
                  {category === "For Sale" && (
                    <div className="py-2">
                      <div className="mb-2">
                        <p className="font-semibold text-cloud-theme-blue">
                          Asking Price
                        </p>
                        {sellingPriceErr && (
                          <p className="font-semibold text-red-600 text-xs">
                            {sellingPriceErr}
                          </p>
                        )}
                      </div>
                      <input
                        type="number"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        className="
                        p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                        focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                        placeholder="asking price"
                      />
                    </div>
                  )}
                  {property === "residential" && (
                    <>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Rental Price
                          </p>
                          {rentPriceErr && (
                            <p className="font-semibold text-red-600 text-xs">
                              {rentPriceErr}
                            </p>
                          )}
                        </div>
                        <input
                          type="number"
                          value={rentPrice}
                          min={0}
                          onChange={(e) => setRentPrice(e.target.value)}
                          className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="rental price"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Rent Deposit
                          </p>
                        </div>
                        <input
                          type="number"
                          value={deposit}
                          onChange={(e) => setDeposit(e.target.value)}
                          className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="deposit"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Service Cost
                          </p>
                        </div>
                        <input
                          type="number"
                          value={serviceCost}
                          onChange={(e) => setServiceCost(e.target.value)}
                          className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="service cost"
                        />
                      </div>
                    </>
                  )}
                  {property === "commercial" &&
                    propertyType === "Co-Working-Space" && (
                      <>
                        <div className="py-2">
                          <div className="mb-2">
                            <p className="font-semibold text-cloud-theme-blue">
                              Working Days
                            </p>
                          </div>
                          <input
                            type="text"
                            maxLength={20}
                            className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                            placeholder="Working days"
                          />
                        </div>
                        <div className="py-2">
                          <div className="mb-2">
                            <p className="font-semibold text-cloud-theme-blue">
                              Available Desks
                            </p>
                          </div>
                          <input
                            type="text"
                            maxLength={20}
                            className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                            placeholder="available desks"
                          />
                        </div>
                        <div className="py-2">
                          <div className="mb-2">
                            <p className="font-semibold text-cloud-theme-blue">
                              No of Meeting Rooms
                            </p>
                          </div>
                          <input
                            type="text"
                            maxLength={10}
                            className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                            placeholder="e.g 20"
                          />
                        </div>
                        <div className="py-2">
                          <div className="mb-2">
                            <p className="font-semibold text-cloud-theme-blue">
                              Packages
                            </p>
                          </div>
                          <textarea
                            type="number"
                            className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                            placeholder="packages"
                          />
                        </div>
                      </>
                    )}
                  {property === "commercial" && (
                    <>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Rental Price
                          </p>
                        </div>
                        <input
                          type="number"
                          value={rentPrice}
                          onChange={(e) => setRentPrice(e.target.value)}
                          className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="rental price"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Rent Deposit
                          </p>
                        </div>
                        <input
                          type="number"
                          value={deposit}
                          onChange={(e) => setDeposit(e.target.value)}
                          className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="deposit"
                        />
                      </div>
                    </>
                  )}
                  {category === "For Lease" && property === "land" && (
                    <div className="py-2">
                      <div className="mb-2">
                        <p className="font-semibold text-cloud-theme-blue">
                          Lease Price
                        </p>
                      </div>
                      <input
                        type="number"
                        value={leasePrice}
                        onChange={(e) => setLeasePrice(e.target.value)}
                        className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                        focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                        placeholder="lease price"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {property === "residential" && (
              <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                <div>
                  <button
                    onClick={togglePerks}
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-lg">
                      Perks
                    </p>
                    {perksAccordion ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                </div>
                <div
                  ref={perkHeight}
                  style={{ maxHeight: `${perksHeight}` }}
                  className="transition-max-height ease-in duration-300"
                >
                  <div className="pt-2"></div>
                  <div className="grid xs-l:grid-cols-3 grid-cols-2 gap-3">
                    <div className="relative flex justify-between items-center pl-1 py-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="wifi"
                          checked={wifi}
                          onChange={(e) => setWifi(!wifi)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="wifi"
                        className="w-full flex justify-start items-center md:text-sm text-xs h-full"
                      >
                        Wi-Fi
                        <BsWifi className="ml-1 -mt-1 text-sm text-cloud-theme-blue" />
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-1 py-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="sauna"
                          checked={sauna}
                          onChange={(e) => setSauna(!sauna)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="sauna"
                        className="w-full flex justify-start items-center md:text-sm text-xs h-full"
                      >
                        Sauna/steam
                        <GiSteamBlast className="ml-1 -mt-1 text-sm text-cloud-theme-blue" />
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-1 py-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="garden"
                          checked={garden}
                          onChange={(e) => setGarden(!garden)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="garden"
                        className="w-full flex justify-start items-center md:text-sm text-xs h-full"
                      >
                        Garden
                        <FaLeaf className="ml-1 -mt-1 text-sm text-cloud-theme-blue" />
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-1 py-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="pool"
                          checked={pool}
                          onChange={(e) => setPool(!pool)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="pool"
                        className="w-full flex justify-start items-center md:text-sm text-xs h-full"
                      >
                        Pool
                        <MdOutlinePool className="ml-1 -mt-1 text-sm text-cloud-theme-blue" />
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-1 py-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="pet"
                          checked={pet}
                          onChange={(e) => setPet(!pet)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="pet"
                        className="w-full flex justify-start items-center md:text-sm text-xs h-full"
                      >
                        Pet Friendly
                        <MdPets className="ml-1 -mt-1 text-sm text-cloud-theme-blue" />
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-1 py-2">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="gym"
                          checked={gym}
                          onChange={() => setGym(!gym)}
                          className="opacity-0 absolute h-4 w-4"
                        />
                        <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                            viewBox="0 0 24 24"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              fill="#FB911B"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                            />
                          </svg>
                        </div>
                      </div>
                      <label
                        htmlFor="gym"
                        className="w-full flex justify-start items-center md:text-sm text-xs h-full"
                      >
                        Gym
                        <CgGym className="ml-1 -mt-1 text-sm text-cloud-theme-blue" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleOtherFeatures}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Other Features
                  </p>
                  {otherFeaturesAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {otherFeatErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {otherFeatErr}
                  </p>
                )}
              </div>
              <div
                ref={otherFeaturesTypeHeight}
                style={{ maxHeight: `${otherFeaturesHeight}` }}
                className="transition-max-height ease-in duration-300"
              >
                <div className="pt-2"></div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-start items-center pl-1 py-2">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="negotiable"
                        value={negotiable}
                        checked={negotiable === true}
                        onChange={(e) => setNegotiable(!negotiable)}
                        className="opacity-0 absolute h-4 w-4"
                      />
                      <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="#FB911B"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          />
                        </svg>
                      </div>
                    </div>
                    <label htmlFor="negotiable" className="md:text-sm text-xs">
                      Price Negotiable?
                    </label>
                  </div>
                  <div className="py-2">
                    <div className="mb-2">
                      {property === "land" ? (
                        <p className="font-semibold text-cloud-theme-blue">
                          Property Size (<span>acres</span>)
                        </p>
                      ) : property === "residential" ?(

                        <p className="font-semibold text-cloud-theme-blue">
                          Property Size (
                          <span>
                            ft<sup>2</sup>
                          </span>
                          )
                        </p> 
                      ):""}

                      {popertySizeErr && (
                        <p className="font-semibold text-red-600 text-xs">
                          {popertySizeErr}
                        </p>
                      )}
                    </div>
                    {property === "land"?<input
                      type="number"
                      value={popertySize}
                      onChange={(e) => setPropertySize(e.target.value)}
                      className="
                            p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                            focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="property size in acres"
                    />:property === "residential"?<input
                    type="number"
                    value={popertySize}
                    onChange={(e) => setPropertySize(e.target.value)}
                    className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="property size in square feet"
                  />:""}
                  </div>
                  {property === "residential" && (
                    <div className="py-2">
                      <div className="mb-2">
                        <p className="font-semibold text-cloud-theme-blue">
                          Living Area (
                          <span>
                            ft<sup>2</sup>
                          </span>
                          )
                        </p>
                      </div>
                      <input
                        type="number"
                        value={livingArea}
                        onChange={(e) => setLivingArea(e.target.value)}
                        className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                        focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                        placeholder="living area in square feet"
                      />
                    </div>
                  )}
                  {property === "land" && (
                    <>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Size of Plots (<span>ft</span>)
                          </p>
                          {plotSizeErr && (
                            <p className="font-semibold text-red-600 text-xs">
                              {plotSizeErr}
                            </p>
                          )}
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={plotSize}
                          onChange={(e) => setPlotSize(e.target.value)}
                          className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="size of plots, eg: 100x50 (ft)"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Number of Plots
                          </p>
                          {numberOfPlotsErr && (
                            <p className="font-semibold text-red-600 text-xs">
                              {numberOfPlotsErr}
                            </p>
                          )}
                        </div>
                        <input
                          type="number"
                          value={numberOfPlots}
                          onChange={(e) => setNumberOfPlots(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="number of plots"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Price per Plot (KES)
                          </p>
                        </div>
                        <input
                          type="number"
                          value={pricePerPlot}
                          min={1}
                          onChange={(e) => setPricePerPlot(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="price per plot"
                        />
                      </div>
                    </>
                  )}
                  {property === "commercial" && (
                    <>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Area to Let
                          </p>
                        </div>
                        <input
                          type="number"
                          value={areaToLet}
                          onChange={(e) => setAreaToLet(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="area to let (ft)"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Number of Stories
                          </p>
                        </div>
                        <input
                          type="number"
                          value={numberOfStories}
                          onChange={(e) => setNumberOfStories(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="number of stories"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Building Class
                          </p>
                          {buildingClassErr && (
                            <p className="font-semibold text-red-600 text-xs">
                              {buildingClassErr}
                            </p>
                          )}
                        </div>
                        <input
                          type="text"
                          maxLength={100}
                          value={buildingClass}
                          onChange={(e) => setBuildingClass(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="building class"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Building Size
                          </p>
                          {buildingSizeErr && (
                            <p className="font-semibold text-red-600 text-xs">
                              {buildingSizeErr}
                            </p>
                          )}
                        </div>
                        <input
                          type="text"
                          maxLength={100}
                          value={buildingSize}
                          onChange={(e) => setBuildingSize(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="building class"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Parking Ratio
                          </p>
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={parkingRatio}
                          onChange={(e) => setParkingRatio(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="In What zone is the land?"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Current Occupancy (%)
                          </p>
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={occupancy}
                          onChange={(e) => setOccupancy(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="eg 70%"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Average Monthly cost
                          </p>
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={avgMontlyCost}
                          onChange={(e) => setAvgMontlyCost(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="In What zone is the land?"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Average Rental Income
                          </p>
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={avgRentalIncome}
                          onChange={(e) => setAvgRentalIncome(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="In What zone is the land?"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Gross Rent Multiplier
                          </p>
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={rentMultiplier}
                          onChange={(e) => setRentMultiplier(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="In What zone is the land?"
                        />
                      </div>
                      <div className="py-2">
                        <div className="mb-2">
                          <p className="font-semibold text-cloud-theme-blue">
                            Existing Tenants
                          </p>
                        </div>
                        <input
                          type="text"
                          maxLength={150}
                          value={existingTenants}
                          onChange={(e) => setExistingTenants(e.target.value)}
                          className="
                          p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                          focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                          placeholder="In What zone is the land?"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : step === 2 ? (
          <>
            <div>
              <h5 className="italic ">Optional</h5>
            </div>
            {property === "residential" || property === "land" ? (
              <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                <div>
                  <button
                    onClick={toggleFinancing}
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-lg">
                      Property Financing
                    </p>
                    {financingAccordion ? <FaAngleUp /> : <FaAngleDown />}
                  </button>
                </div>

                <div
                  ref={financingHeight}
                  style={{ maxHeight: `${financingTypeHeight}` }}
                  className="transition-max-height ease-in duration-300 pl-5"
                >
                  <div className="pt-2"></div>
                  <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                    <label htmlFor="Cash-Buyers-Only" className="w-full h-full">
                      Cash Buyers Only
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="Cash-Buyers-Only"
                        value="Cash-Buyers-Only"
                        checked={financing === "Cash-Buyers-Only"}
                        onChange={(e) => setFinancingType(e.target.value)}
                        className="opacity-0 absolute h-4 w-4"
                      />
                      <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="#FB911B"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                    <label
                      htmlFor="Financing Available"
                      className="w-full h-full"
                    >
                      Financing Available
                    </label>
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="Financing Available"
                        value="Financing Available"
                        checked={financing === "Financing Available"}
                        onChange={(e) => setFinancingType(e.target.value)}
                        className="opacity-0 absolute h-4 w-4"
                      />
                      <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                          viewBox="0 0 24 24"
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path
                            fill="#FB911B"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleDealType}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Property Options
                  </p>
                  {dealAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
              <div
                ref={dealTypeHeight}
                style={{ maxHeight: `${dealsTypeHeight}` }}
                className="transition-max-height ease-in duration-300 pl-5"
              >
                <div className="pt-2"></div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="Flipping-deals" className="w-full h-full">
                    Flipping-Deals
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Flipping-deals"
                      value="Flipping-deals"
                      checked={dealsType === "Flipping-deals"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="Off-Plan" className="w-full h-full">
                    Off-Plan
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Off-Plan"
                      value="Off-Plan"
                      checked={dealsType === "Off-Plan"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="Joint-Venture" className="w-full h-full">
                    Joint Venture
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Joint-Venture"
                      value="Joint-Venture"
                      checked={dealsType === "Joint-Venture"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="Income-Properties" className="w-full h-full">
                    Income Properties
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Income-Properties"
                      value="Income-Properties"
                      checked={dealsType === "Income-Properties"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="For-Redevelopment" className="w-full h-full">
                    For Redevelopment
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="For-Redevelopment"
                      value="For-Redevelopment"
                      checked={dealsType === "For-Redevelopment"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label
                    htmlFor="Incomplete-Buildings"
                    className="w-full h-full"
                  >
                    Incomplete Buildings
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Incomplete-Buildings"
                      value="Incomplete-Buildings"
                      checked={dealsType === "Incomplete-Buildings"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label
                    htmlFor="Institutional-Properties"
                    className="w-full h-full"
                  >
                    Institutional Properties
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Institutional-Properties"
                      value="Institutional-Properties"
                      checked={dealsType === "Institutional-Properties"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="Destressed-Sale" className="w-full h-full">
                    Distressed Sale
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Destressed-Sale"
                      value="Destressed-Sale"
                      checked={dealsType === "Destressed-Sale"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="relative flex justify-between items-center pl-2 py-2 hover:bg-blue-50">
                  <label htmlFor="Quick-Sale" className="w-full h-full">
                    Quick Sale
                  </label>
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="Quick-Sale"
                      value="Quick-Sale"
                      checked={dealsType === "Quick-Sale"}
                      onChange={(e) => setDealsType(e.target.value)}
                      className="opacity-0 absolute h-4 w-4"
                    />
                    <div className="bg-white border-2 rounded-full border-cloud-theme-gold w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        className="fill-current hidden w-4 h-4 text-cloud-theme-gold pointer-events-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          fill="#FB911B"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {step === 2 ? (
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            {addListingloading ? (
              <SpinOne />
            ) : (
              <button
                className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        ) : step === 1 ? (
          <div className="grid grid-cols-1 mt-5">
            <button
              className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </div>
        ) : step === 3 ? (
          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            {addListingloading ? (
              <SpinOne />
            ) : (
              <button
                className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </form>
      <div>
        <div className="mt-5 sm:flex hidden mb-3 items-center justify-center">
          <h4 className="text-black font-bold text-md underline">
            Property Images
          </h4>
        </div>
        <div>
          <div className="shadow-md px-3 py-2 mb-5">
            <p className="font-semibold text-cloud-theme-blue text-lg">
              Property Images
            </p>
            {imgsErr && (
              <p className="font-semibold text-red-600 text-xxs">{imgsErr}</p>
            )}
          </div>
          <div className="mt-1 flex relative justify-center px-6 py-3 border-2 border-gray-300 border-dashed rounded-md">
            <div className="text-center">
              <svg
                className="mx-auto h-8 w-8 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="
                    cursor-pointer bg-white rounded-md font-medium text-cloud-theme-blue 
                    hover:text-cloud-theme-blue underline"
                >
                  <span>Click or drag and drop to add image files</span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  accept="image/png, image/jpeg"
                  type="file"
                  multiple={true}
                  onChange={(e) => imageHandler(e)}
                  className="absolute w-full h-full top-0 left-0 opacity-0"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="shadow-md mt-3 pb-3">
              <p className="mt-3 mb-2 px-2">New Images</p>
              {addingImagesMessage && (
                <p className="mt-3 mb-2 text-xs text-red-600 px-2">
                  {addingImagesMessage}
                </p>
              )}

              <div className="grid xs-l:grid-cols-3 grid-cols-2 gap-4 mt-1 p-2.5 bg-gray-100">
                {showImages(imagePrevList)}
              </div>
              {imagePrevList.length > 0 && (
                <div className="px-3 mt-2 block ">
                  {addingImages ? (
                    <SpinMadoido />
                  ) : (
                    <button
                      className="bg-cloud-theme-blue w-full text-white text-center py-2 rounded-md shadow-lg"
                      type="button"
                      onClick={haddleAddImages}
                    >
                      Add Images
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="shadow-md mt-3 overflow-hidden">
              <div className="px-2 mb-2">
                <button
                  onClick={toggleExistingImgs}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg sm:text-base">
                    Show Existing Images
                  </p>
                  {existingImgsAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
                {/* {soldByErr && (
                  <p className="font-semibold text-red-600 text-xs">
                    {soldByErr}
                  </p>
                )} */}
              </div>
              <div
                ref={existingImgsHeight}
                style={{ maxHeight: `${existingImgsAccordionHeight}` }}
                className="transition-max-height ease-in duration-300"
              >
                <div className="grid md-xls:grid-cols-3 grid-cols-2 gap-4 mt-2 p-2.5 bg-gray-100">
                  {showExistingImages(listing.properties.Images)}
                </div>
              </div>
            </div>
          </div>
          {property === "residential" ? (
            <div>
              <div className="shadow-md px-3 py-2 mb-5 mt-3">
                <p className="font-semibold text-cloud-theme-blue text-lg">
                  Property House Plan Image
                </p>
                <div className="w-full mt-2 h-48">
                  <img
                    className="w-full h-full object-cover"
                    src={listing.properties.house_plan}
                    alt=""
                  />
                </div>
                <div className="mt-2">
                  {changingPlanMessage && (
                    <p className="my-2 text-red-500 text-xxs">
                      {changingPlanMessage}
                    </p>
                  )}
                  <input
                    accept="image/png, image/jpeg"
                    onChange={(e) => setPlanImage(e.target.files)}
                    multiple={false}
                    className="block my-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer 
                    dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
                    id="thumb"
                    type="file"
                  />
                  {planImage ? (
                    <div>
                      {changingPlan ? (
                        <SpinMadoido />
                      ) : (
                        <button
                          className="bg-cloud-theme-blue w-full text-white text-center py-2 rounded-md shadow-lg"
                          type="button"
                          onClick={handleChangePlan}
                        >
                          Change House Plan
                        </button>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

const DragDrop = ({
  files,
  imagePrevList,
  setImgs,
  setImagePrevList,
  setFiles,
}) => {
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const files1 = e.dataTransfer.files;
    if (e.dataTransfer.files) {
      setFiles(() => e.dataTransfer.files);
      imageHandler(files);
    } else console.log("not found");
  };
  const imageHandler = (files) => {
    if (files) {
      const fileList = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePrevList((prevImages) => prevImages.concat(fileList));
      Array.from(files).map((file) => URL.revokeObjectURL(file));
    }
    setImgs({ images: files });
  };
  return (
    <div>
      <div
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        className=""
      >
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-cloud-theme-blue hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:cloud-theme-blue"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  multiple={true}
                  accept="image/png, image/jpeg"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 1MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const AddMarker = ({ position, setPosition }) => {
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
  // useMapEvents({
  //   click: (e) => {
  //     setPosition([e.latlng.lat, e.latlng.lng]); // 👈 add marker
  //   },
  // });
  return position === null ? null : (
    <Marker position={position} icon={myIcon}></Marker>
  );
};
const CurrentPositionMarker = ({ position }) => {
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
  return position === null ? null : (
    <Marker position={position} icon={myIcon}></Marker>
  );
};
export default EditListings;
//propertyType === "Co-Working-Space"
