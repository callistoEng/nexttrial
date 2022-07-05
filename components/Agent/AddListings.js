import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { FaAngleDown, FaAngleUp, FaLeaf } from "react-icons/fa";
import { GiSteamBlast } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";

import { BsWifi } from "react-icons/bs";
// import { TrackpageView } from "../GAnalytics";
import { CgGym } from "react-icons/cg";
import { SpinOne } from "../Spinners/Spinner";
import {
  MdCancel,
  MdErrorOutline,
  MdOutlinePool,
  MdPets,
} from "react-icons/md";
import Link from "next/link";
import { addListings } from "../../state/actionCreators/listings";
import { failedAddingListing } from "../../state/estateSlices/allListingSlices";
// import Addresses from "./Addresses";
import { GrClose } from "react-icons/gr";
const imgMimeType = /image\/(png|jpg|jpeg)/i;
// const map_libs = process.env.REACT_APP_GOOGLE_LIBRARIES || ''.split(',')
const AddListings = () => {
  const dispatch = useDispatch();
  const [wifi, setWifi] = useState(false);
  const [stepOneErr, setStepOneErr] = useState(false);
  const [stepTwoErr, setStepTwoErr] = useState(false);
  const [planImgUrl, setPlanImgUrl] = useState(null);
  const [planImgPreview, setPlanImgPreview] = useState(null);
  const [thumbImgPreview, setThumbImgPreview] = useState(null);
  const [thumbImgPreviewUrl, setThumbImgPreviewUrl] = useState(null);
  const [stepThreeErr, setStepThreeErr] = useState(false);
  const [planImage, setPlanImage] = useState(false);
  const [thumbImage, setThumbImage] = useState(false);
  const [planImageErr, setPlanImageErr] = useState(false);
  const [sauna, setSauna] = useState(false);
  const [negotiable, setNegotiable] = useState(false);
  const [gym, setGym] = useState(false);
  const [garden, setGarden] = useState(false);
  const [pet, setPet] = useState(false);
  const [pool, setPool] = useState(false);
  const [step, setStep] = useState(1);
  const [imgs, setImgs] = useState(null);
  const [imgsErr, setImgsErr] = useState(null);
  const [imagePrevList, setImagePrevList] = useState([]);
  const [sellingPrice, setSellingPrice] = useState("");
  const [date, setDate] = useState("");
  const [dateErr, setDateErr] = useState();
  const [sellingPriceErr, setSellingPriceErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [leasePrice, setLeasePrice] = useState("");
  const [rentPrice, setRentPrice] = useState(0);
  const [rentPriceErr, setRentPriceErr] = useState("");
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [deposit, setDeposit] = useState("");
  const [popertySize, setPropertySize] = useState("");
  const [livingArea, setLivingArea] = useState("");
  const [areaToLet, setAreaToLet] = useState("");
  const [numberOfStories, setNumberOfStories] = useState("");
  const [buildingClass, setBuildingClass] = useState("");
  const [buildingClassErr, setBuildingClassErr] = useState("");
  const [buildingSize, setBuildingSize] = useState("");
  const [buildingSizeErr, setBuildingSizeErr] = useState("");
  const [parkingRatio, setParkingRatio] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [avgMontlyCost, setAvgMontlyCost] = useState("");
  const [avgRentalIncome, setAvgRentalIncome] = useState("");
  const [rentMultiplier, setRentMultiplier] = useState("");
  const [existingTenants, setExistingTenants] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [plotSizeErr, setPlotSizeErr] = useState("");
  const [position, setPosition] = useState(null);
  const [positionErr, setPositionErr] = useState(null);
  const [numberOfPlots, setNumberOfPlots] = useState("");
  const [numberOfPlotsErr, setNumberOfPlotsErr] = useState("");
  const [pricePerPlot, setPricePerPlot] = useState("");
  const [category, setCategory] = useState("For Sale");
  const [propTypeAccordion, setPropTypeAccordion] = useState(false);
  const [property, setProperty] = useState("residential");
  const [propMainHeight, setPropMainHeight] = useState("0px");
  const [propAccordion, setPropAccordion] = useState(false);
  const [propertyType, setPropertyType] = useState("");
  const [propertyTypeErr, setPropertyTypeErr] = useState("");
  const [propTypeHeight, setPropTypeHeight] = useState("0px");
  const [roomsHeight, setRoomsHeight] = useState("0px");
  const [roomsAccordion, setRoomsAccordion] = useState(false);
  const [locationsHeight, setLocationsHeight] = useState("0px");
  const [priceAccordion, setPriceAccordion] = useState(false);
  const [priceHeight, setPriceHeight] = useState("0px");
  const [locationsAccordion, setlocationsAccordion] = useState(false);
  const [bedrooms, setBedrooms] = useState("");
  const [bedroomsErr, setBedroomsErr] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bathroomsErr, setBathroomsErr] = useState("");
  const [soldBy, setSoldBy] = useState("Agent");
  const [soldByErr, setSoldByErr] = useState("");
  const [garages, setGarages] = useState("");
  const [livingRooms, setLivingRooms] = useState("");
  const [livingRoomsErr, setLivingRoomsErr] = useState("");
  const [diningRooms, setDiningRooms] = useState("");
  const [diningRoomsErr, setDiningRoomsErr] = useState("");
  const [roomsErr, setRoomsErr] = useState("");
  const [mapPos, setMapPos] = useState({ lat: -1.286389, lng: 36.817223 });
  const [parkingSpaces, setParkingSpaces] = useState("");
  const [parkingSpacesErr, setParkingSpacesErr] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationDescriptionErr, setLocationDescriptionErr] = useState("");
  const [developmentType, setDevelopmentType] = useState("");
  const [developmentTypeErr, setDevelopmentTypeErr] = useState("");
  const [financingTypeHeight, setFinancingTypeHeight] = useState("0px");
  const [financing, setFinancingType] = useState("");
  const [financingAccordion, setFinancingAccordion] = useState(false);
  const [dealsTypeHeight, setDealsTypeHeight] = useState("0px");
  const [dealsType, setDealsType] = useState("");
  const [dealAccordion, setDealAccordion] = useState(false);
  const [availability, setAvailability] = useState("FLEXIBLE");
  const [availabilityErr, setAvailabilityErr] = useState("");
  const [otherFeaturesHeight, setOtherFeaturesHeight] = useState("0px");
  const [otherFeaturesAccordion, setOtherFeaturesAccordion] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const propertyTypeHeight = useRef(null);
  const propertyHeight = useRef(null);
  const roomHeight = useRef(null);
  const locationHeight = useRef(null);
  const costHeight = useRef(null);
  const financingHeight = useRef(null);
  const dealTypeHeight = useRef(null);
  const otherFeaturesTypeHeight = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const mapRef = useRef();
  const [theImg, setIms] = useState([]);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const imagesHandler = (e) => {
    if (e.target.files) {
      const imgList = e.target.files;
      const fileList = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePrevList((prevImages) => prevImages.concat(fileList));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

      for (let i = 0; i < imgList.length; i++) {
        setIms((img) =>
          img.concat({
            name: imgList[i].name,
            url: URL.createObjectURL(imgList[i]),
            file: imgList[i],
          })
        );
      }
    }
    setImgs({ images: e.target.files });
  };
  const previewPlanImg = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imgMimeType)) {
      alert("Invalid file for image");
      return;
    }
    setPlanImage(e.target.files);
    setPlanImgPreview(file);
  };
  const previewThumbImg = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imgMimeType)) {
      alert("Invalid file for image");
      return;
    }
    setThumbImage(e.target.files);
    setThumbImgPreview(file);
  };
  const handleMapClick = (e) => {
    const latjs = e.latLng.toJSON();
    setMapPos(latjs);
    setPosition([mapPos.lat, mapPos.lng]);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (planImgPreview) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setPlanImgUrl(result);
        }
      };
      fileReader.readAsDataURL(planImgPreview);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [planImgPreview]);
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (thumbImgPreview) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setThumbImgPreviewUrl(result);
        }
      };
      fileReader.readAsDataURL(thumbImgPreview);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [thumbImgPreview]);
  const removeImage = (image) => {
    theImg.splice(theImg.indexOf(image), 1);
    setIms(theImg.filter((img) => img !== image));
    setImagePrevList(imagePrevList.filter((img) => img !== image));
  };

  const showImages = (source) => {
    return source.flatMap((img, index) => {
      return (
        <div
          className="w-full sm:h-36 h-[7.125rem] relative shadow-md"
          key={index}
        >
          <img
            className="w-full h-full object-cover"
            src={img.url}
            key={img}
            alt=""
          />
          <button
            type="button"
            onClick={() => removeImage(img)}
            // onClick={() => removeImage(theImg.indexOf(img))}
            className="absolute top-2 right-2 p-1 bg-cloud-theme-gold/60 shadow-md rounded-sm"
          >
            <GrClose className="text-sm text-white" />
          </button>
        </div>
      );
    });
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
  const toggleListingLoacation = () => {
    setlocationsAccordion(locationsAccordion === false ? true : false);
    setLocationsHeight(
      !locationsAccordion ? `${locationHeight.current.scrollHeight}px` : "0px"
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
  let autocompleteValue;
  const onLoadAuto = (autocomplete) => {
    autocompleteValue = autocomplete;
  };
  const onPlaceChanged = () => {
    // if (autocompleteValue !== null) {
    //   console.log("place", autocompleteValue.getPlace());
    // } else {
    //   console.log("Autocomplete is not loaded yet!");
    // }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    var google = window.google;

    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
    // TrackpageView("/auth/agent/add-listings");
    return () => {
      dispatch(failedAddingListing());
    };
  }, [dispatch]);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const addListingloading = useSelector(
    (state) => state.listings.addListingloading
  );
  const listingAdded = useSelector((state) => state.listings.listingAdded);
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
    if (!title) {
      setTitleErr("This field is required");
      setStepOneErr("Error!Listing title missing in step one");
      return;
    }
    if (!description) {
      setTitleErr("");
      setStepOneErr("Error! Listing description is missing in step one");
      setDescriptionErr("This field is required");

      return;
    }
    if (!locationDescription) {
      setTitleErr("");
      setDescriptionErr("");
      setStepOneErr("Error! Listing address is missing in step one");
      setLocationDescriptionErr("This field is required");
      return;
    }
    if (!position) {
      setTitleErr("");
      setStepOneErr("Error! Listing map location is missing in step one");
      setDescriptionErr("");
      setLocationDescriptionErr("");
      setPositionErr("This field is required");
      return;
    }
    if (!propertyType) {
      setStepOneErr("Error!Property type not set in step one");
      setPropertyTypeErr("This field is required");
      return;
    }
    setPropertyTypeErr("");
    setPositionErr("");
    setSoldByErr("");
    setDescriptionErr("");
    setLocationDescriptionErr("");
    setStepOneErr("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", position);
    formData.append("listing_availability", availability);
    formData.append("sold_by", soldBy);
    formData.append("description", description);
    formData.append("location_description", locationDescription);
    formData.append("is_negotiable", negotiable);
    formData.append("property", property);
    formData.append("agent_id", user.id);
    if (property === "residential") {
      setDateErr("");
      if (category === "For Sale") {
        if (!sellingPrice) {
          setSellingPriceErr("This field is required");
          setPriceErr("Some info is missing");
          setStepOneErr("Error! selling price is missing in step one");
          return;
        }
      }
      setSellingPriceErr("");
      setPriceErr("");
      setStepOneErr("");

      if (category === "For Rent") {
        if (!rentPrice) {
          setRentPriceErr("This field is required");
          setPriceErr("Some info is missing");
          setStepOneErr("Rental price is missing in step one");
          return;
        }
        setRentPriceErr("");
        setStepOneErr("");
      }

      setRentPriceErr("");
      setDepositErr("");
      if (propertyType !== "Studio" && bedrooms == 0) {
        setBedroomsErr("This field can't be zero");
        setRoomsErr("Some info is missing");
        setStepOneErr("Error! Some rooms are missing in step one");
        return;
      }
      setBedroomsErr("");
      setStepOneErr("");
      if (propertyType === "Studio" && bathrooms > 0) {
        setBathroomsErr("Set 0 bathrooms for Studio");
        setRoomsErr("Some info is missing");
        setStepOneErr("Error! Some rooms are incorrect in step one");
        return;
      }
      setBathroomsErr("");
      setStepOneErr("");

      if (propertyType !== "Studio") {
        setLivingRoomsErr("");
        setDiningRoomsErr("");
      }

      setRoomsErr("");
      setStepOneErr("");

      if (!developmentType) {
        setDevelopmentTypeErr("This field is required");
        setStepOneErr("Error! Development type not set in step one");
        return;
      }
      if (!theImg) {
        setImgsErr("This field is required");
        setStepThreeErr("Error! Images missing above");
        return;
      }
      if (theImg.length < 6) {
        setImgsErr("Provide atleast 6 images");
        setStepThreeErr("Error! Images provided are less");
        return;
      } else if (theImg.length > 15) {
        setImgsErr("Images can't be more than 15");
        setStepThreeErr("Error! Too many Images");
        return;
      } else {
        for (let file of theImg) {
          formData.append("Images", file.file);
        }
        setImgsErr("");
      }
      setStepOneErr("");
      setStepThreeErr("");
      setPlanImageErr("");
      formData.append("selling_price", processNumbers(sellingPrice));
      if (category === "For Rent") {
        formData.append("category_id", 2);
      } else if (category === "For Sale") {
        formData.append("category_id", 3);
      } else {
        formData.append("category_id", 2);
      }
      setStepOneErr("");

      formData.append("year", processDate(date));
      formData.append("financing_type", financing);
      if (planImage) {
        formData.append("house_plan", planImage[0]);
      }
      if (thumbImage) {
        formData.append("thumbnail", thumbImage[0]);
      }

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
      dispatch(addListings(formData));
      return;
    }
    if (property === "land") {
      if (category === "For Sale") {
        if (!sellingPrice) {
          setSellingPriceErr("This field is required");
          setPriceErr("Some info is missing");
          setStepOneErr("Error! Selling price is missing in step one");
          return;
        }
      }
      setSellingPriceErr("");
      if (category === "For Lease") {
        if (!leasePrice) {
          setLeasePriceErr("This field is required");
          setPriceErr("Some info is missing");
          setStepOneErr("Error!Lease price missing in step one");
          return;
        }
      }
      setLeaseTermsErr("");
      setLeasePriceErr("");
      if (!popertySize) {
        setPropertySizeErr("This field is required");
        setStepOneErr("Error!Property size is required for land in step one");
        return;
      }
      if (!plotSize) {
        setPlotSizeErr("This field is required");
        setStepOneErr("Error!Plot size is required for land in step one");
        return;
      }
      if (!numberOfPlots) {
        setPlotSizeErr("");
        setStepOneErr("Error!Plot size is required for land in step one");
        setNumberOfPlotsErr("This field is required");
        return;
      }
      setSellingPriceErr("");
      setPriceErr("");
      setPlotSizeErr("");
      setStepOneErr("");
      setNumberOfPlotsErr("");
      
      if (theImg.length < 6) {
        setImgsErr("Provide atleast 6 images");
        setStepThreeErr("Error! Images provided are less");
        return;
      } else if (theImg.length > 15) {
        setImgsErr("Images can't be more than 15");
        setStepThreeErr("Error! Too many Images");
        return;
      } else {
        for (let file of theImg) {
          formData.append("Images", file.file);
        }
        setImgsErr("");
      }
      if (thumbImage) {
        formData.append("thumbnail", thumbImage[0]);
      }
      setStepOneErr("");
      setStepOneErr("");
      setStepThreeErr("");
      if (category === "For Lease") {
        formData.append("category_id", 1);
      } else if (category === "For Sale") {
        formData.append("category_id", 3);
      } else {
        formData.append("category_id", 1);
      }
      setStepOneErr("");
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
      dispatch(addListings(formData));
      return;
    }
    if (property === "commercial") {
      setDateErr("");
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
      setStepOneErr("");
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
      setRoomsErr("");
      setStepOneErr("");
      if (category === "For Rent") {
        formData.append("category_id", 2);
      } else if (category === "For Sale") {
        formData.append("category_id", 3);
      } else {
        formData.append("category_id", 2);
      }

      setStepOneErr("");
      if (theImg) {
        if (theImg.length < 6) {
          setImgsErr("Provide atleast 6 images");
          setStepThreeErr("Error! Images provided are less");
          return;
        } else if (theImg.length > 15) {
          setImgsErr("Images can't be more than 15");
          setStepThreeErr("Error! Too many Images");
          return;
        } else {
          for (let file of theImg) {
            formData.append("Images", file.file);
          }
          setImgsErr("");
        }
      }
      if (thumbImage) {
        formData.append("thumbnail", thumbImage[0]);
      }
      setStepThreeErr("");
      formData.append("selling_price", processNumbers(sellingPrice));
      formData.append("year", processDate(date));
      formData.append("development_type", developmentType);
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
      dispatch(addListings(formData));
      return;
    }
  };
  if (!isAuthenticated) {
    return (
      <div className="mt-[6rem] h-screen w-full">
        <div className="sm:w-[38.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-blue">
            Please wait... Authenticating. If not redirected you can refresh
            page or login again
          </p>
        </div>
      </div>
    );
  }
  if (user && !user.is_agent) {
    return (
      <div className="mt-[6rem] pb-10 h-screen w-full">
        <div className="sm:w-[37.5rem] mt-20 xs-l:w-[30rem] w-full px-5 xs-l:px-0 mx-auto mb-5">
          <p className="animate-pulse text-cloud-theme-blue">
            Unauthorised! This page is for those who are registered as agents.
          </p>
          <p>
            <Link className="underline text-cloud-theme-gold" to="/auth/login">
              Login
            </Link>{" "}
            first
          </p>
          <p>or</p>
          <p>
            Follow this link{" "}
            <Link
              className="underline text-cloud-theme-gold"
              to="/auth/user/my-preferences"
            >
              My Profile
            </Link>{" "}
            to update your account to agent status
          </p>
        </div>
      </div>
    );
  }
  if (listingAdded) {
    return <Navigate to="/auth/agent/dashboard" />;
  }
  return (
    <section className="xs-l:mt-[6rem] mt-[4.6rem] mb-6">
      <div className="md:w-[37rem] xs-l:mb-5 mb-0 xs-l:w-[30rem] xs-l:p-0 p-5 w-full mx-auto">
        <h3 className="font-bold text-cloud-theme-blue text-lg mb-3">
          Add Listings
        </h3>
        <div className="shadow-md bg-blue-300 px-3 py-1 leading-3 mb-5">
          <p className="font-semibold text-cloud-theme-blue text-xs italic text-black animate-bounce">
            All compulsory fields are marked with (*).
          </p>
        </div>

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
          <div className="flex justify-between z-20 items-center">
            <div className="relative flex flex-col items-center text-cloud-theme-blue">
              <div
                className={
                  step === 3 && stepThreeErr
                    ? `rounded-full transition duration-300 ease-in-out
                  h-8 w-8 flex items-center justify-center 
                 bg-red-600 text-white`
                    : `rounded-full transition duration-300 ease-in-out
                   h-8 w-8 flex items-center justify-center 
                   bg-cloud-theme-blue text-white`
                }
              >
                {step === 3 ? (
                  3
                ) : stepThreeErr ? (
                  <MdErrorOutline className="text-xl text-red-600" />
                ) : (
                  3
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
              : step === 3
              ? "Property Images"
              : "Terms"}
          </h4>
        </div>
      </div>
      <form className="w-full px-4 mx-auto" onSubmit={onSubmit}>
        {step === 1 ? (
          <>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-3 md:gap-4">
              <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                <div>
                  <button
                    onClick={toggleProperty}
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-sm">
                      Category *
                    </p>
                  </button>
                </div>
                <div className="transition-max-height ease-in duration-300 pl-1">
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
                    // onClick={togglePropertyCategory}
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-xs xs:text-sm">
                      Reason For Listing *
                    </p>
                  </button>
                </div>
                <div className="transition-max-height ease-in duration-300 pl-1">
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
                    // onClick={toggleSoldBy}
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-sm">
                      Source
                    </p>
                  </button>
                  {soldByErr && (
                    <p className="font-semibold text-red-600 text-xs">
                      {soldByErr}
                    </p>
                  )}
                </div>
                <div className="transition-max-height ease-in duration-300 pl-1">
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
                </div>
              </div>
              <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-sm">
                      Availability
                    </p>
                  </button>
                  {availabilityErr && (
                    <p className="font-semibold text-red-600 text-xs">
                      {availabilityErr}
                    </p>
                  )}
                </div>
                <div className="transition-max-height ease-in duration-300 pl-1">
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
            </div>
            {property === "residential" ? (
              <div className="grid grid-cols-1 md:grid-cols-3 xs-auth:grid-cols-2 gap-4">
                <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                  <div>
                    <button
                      type="button"
                      className="flex w-full justify-between items-center mb-0 py-1"
                    >
                      <p className="font-semibold text-cloud-theme-blue text-sm">
                        Development Type *
                      </p>
                    </button>
                    {developmentTypeErr && (
                      <p className="font-semibold text-red-600 text-xs">
                        {developmentTypeErr}
                      </p>
                    )}
                  </div>
                  <div className="transition-max-height ease-in duration-300 pl-1">
                    <div className="pt-2"></div>
                    <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                      <label htmlFor="Stand-Alone" className="w-full h-full">
                        Stand-Alone
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                      <label
                        htmlFor="Gated-Communities"
                        className="w-full h-full"
                      >
                        Gated Communities
                      </label>
                    </div>
                    <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                      <label htmlFor="Mixed-Use" className="w-full h-full">
                        Mixed-Use
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shadow-md md:col-span-2 xs-auth:col-span-1 px-3 py-2 mb-5 overflow-hidden">
                  <div>
                    <button
                      // onClick={togglePerks}
                      type="button"
                      className="flex w-full justify-between items-center mb-0 py-1"
                    >
                      <p className="font-semibold text-cloud-theme-blue text-sm">
                        Perks
                      </p>
                    </button>
                  </div>
                  <div className="transition-max-height ease-in duration-300">
                    <div className="pt-2"></div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative flex justify-between items-center content-center pl-1 py-1">
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
                          <BsWifi className="ml-2 text-sm text-cloud-theme-blue" />
                        </label>
                      </div>
                      <div className="relative flex justify-between items-center content-center pl-1 py-1">
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
                          <GiSteamBlast className="ml-2 text-sm text-cloud-theme-blue" />
                        </label>
                      </div>
                      <div className="relative flex justify-between items-center content-center pl-1 py-1">
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
                          <FaLeaf className="ml-2 text-sm text-cloud-theme-blue" />
                        </label>
                      </div>
                      <div className="relative flex justify-between items-center content-center pl-1 py-1">
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
                          <MdOutlinePool className="ml-2 text-sm text-cloud-theme-blue" />
                        </label>
                      </div>
                      <div className="relative flex justify-between items-center content-center pl-1 py-1">
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
                          <MdPets className="ml-2 text-sm text-cloud-theme-blue" />
                        </label>
                      </div>
                      <div className="relative flex justify-between items-center content-center pl-1 py-1">
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
                          <CgGym className="ml-2 text-sm text-cloud-theme-blue" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <div className="shadow-md px-3 py-2 mb-5">
                  <div>
                    <p className="font-semibold text-cloud-theme-blue text-lg">
                      Property Title *
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
                      maxLength={150}
                      onChange={(e) => setTitle(e.target.value)}
                      className="p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
              focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="eg: 3 bedroom apartment, fully furnished "
                    />
                  </div>
                </div>
                {property === "residential" || property === "commercial" ? (
                  <div className="shadow-md px-3 py-2 mb-5">
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
                  </div>
                ) : (
                  ""
                )}
                {property === "residential" ? (
                  <>
                    <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                      <div>
                        <button
                          onClick={toggleRooms}
                          type="button"
                          className="flex w-full justify-between items-center mb-0 py-1"
                        >
                          <p className="font-semibold text-cloud-theme-blue text-lg">
                            Rooms *
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
                          ) : (
                            <>
                              <div className="">
                                <h5 className="w-full">Bedrooms *</h5>
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
                                      onChange={(e) =>
                                        setBedrooms(e.target.value)
                                      }
                                      className="block p-2 w-full text-sm outline-none rounded-md text-gray-900 bg-gray-50 border border-gray-300 
                focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="">
                                <h5 className="w-full">Bathrooms *</h5>
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
                                      onChange={(e) =>
                                        setBathrooms(e.target.value)
                                      }
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
                                      onChange={(e) =>
                                        setGarages(e.target.value)
                                      }
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
                    <button
                      onClick={togglePrice}
                      type="button"
                      className="flex w-full justify-between items-center mb-0 py-1"
                    >
                      <p className="font-semibold text-cloud-theme-blue text-lg">
                        Price (KES) *
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
                              Asking Price *
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
                      {property === "residential" && category === "For Rent" ? (
                        <>
                          <div className="py-2">
                            <div className="mb-2">
                              <p className="font-semibold text-cloud-theme-blue">
                                Rental Price *
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
                                Rent Deposit *
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
                      ) : (
                        ""
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
                      {property === "commercial" && category === "For Rent" && (
                        <>
                          <div className="py-2">
                            <div className="mb-2">
                              <p className="font-semibold text-cloud-theme-blue">
                                Rental Price *
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
                              Lease Price *
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
              </div>
              <div>
                <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                  <div>
                    <button
                      onClick={togglePropertyType}
                      type="button"
                      className="flex w-full justify-between items-center mb-0 py-1"
                    >
                      <p className="font-semibold text-cloud-theme-blue text-lg">
                        Property Type *
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
                    className="transition-max-height ease-in duration-300 pl-0"
                  >
                    <div className="pt-2"></div>
                    {property === "residential" ? (
                      <>
                        <div>
                          <h5 className="font-semibold text-xs">
                            Property Types for Residential Properties
                          </h5>
                        </div>
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
                          <label htmlFor="Studio" className="w-full h-full">
                            Studio
                          </label>
                          <div className="relative">
                            <input
                              type="checkbox"
                              id="Studio"
                              value="Studio"
                              checked={propertyType === "Studio"}
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
                          <label
                            htmlFor="Retail-Shops"
                            className="w-full h-full"
                          >
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        {/* <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                      </div> */}
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
                          <label
                            htmlFor="For-Commercial"
                            className="w-full h-full"
                          >
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
                          <label
                            htmlFor="Agricultural"
                            className="w-full h-full"
                          >
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                              checked={
                                propertyType === "institutional-development"
                              }
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
                          <label
                            htmlFor="Recreational"
                            className="w-full h-full"
                          >
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
                        <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
              </div>
            </div>
            <div className="grid grid-cols-1 sm-2:grid-cols-2 gap-5">
              <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                <div>
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Description *
                  </p>
                  {descriptionErr && (
                    <p className="font-semibold text-red-600 text-xs">
                      {descriptionErr}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  {editorLoaded ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      config={{
                        placeholder:
                          "Add exhaustive listing description here including services and features  not collected in the form",
                      }}
                      onReady={() => {}}
                      onChange={(event, editor) =>
                        setDescription(editor.getData())
                      }
                    />
                  ) : (
                    <p>Loading editor</p>
                  )}
                </div>
              </div>
              <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
                <div>
                  <button
                    onClick={toggleListingLoacation}
                    type="button"
                    className="flex w-full justify-between items-center mb-0 py-1"
                  >
                    <p className="font-semibold text-cloud-theme-blue text-lg">
                      Listing Location *
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
                  <div className="pt-1"></div>
                  {/* <div className="py-2">
                  <div className="mb-2">
                    <p className="font-semibold text-cloud-theme-blue">
                      Address
                    </p>
                    {locationDescriptionErr && (
                      <p className="font-semibold text-red-600 text-xs">
                        {locationDescriptionErr}
                      </p>
                    )}
                  </div>
                  <Autocomplete
                  // onLoad={onLoadAuto}
                  onPlaceChanged={onPlaceChanged}
                  >
                  <input
                    type="text"
                    // value={locationDescription}
                    // onChange={(e) => setLocationDescription(e.target.value)}
                    className="
                    p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                    focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                    placeholder="eg: Nairobi, Kilimani"
                  />
                  </Autocomplete>
                </div> */}

                  <div className="py-1">
                    <div className="mb-1 ">
                      <p className="font-semibold text-sm text-cloud-theme-blue">
                        Address *
                      </p>
                      {locationDescriptionErr && (
                        <p className="font-semibold text-red-600 text-xs">
                          {locationDescriptionErr}
                        </p>
                      )}
                    </div>
                    {isLoaded ? (
                      <p>Loaded combo</p>
                    ) : (
                      // <Addresses
                      //   setPosition={setPosition}
                      //   setLocationDescription={setLocationDescription}
                      //   setMapPos={(position) => setMapPos(position)}
                      // />
                      ""
                    )}
                  </div>
                  <div className=" py-1">
                    <div className="mb-1">
                      <p className="font-semibold text-sm text-cloud-theme-blue">
                        Click on the map to add the property's geolocation *
                      </p>
                      {positionErr && (
                        <p className="font-semibold text-red-600 text-xs">
                          {positionErr}
                        </p>
                      )}
                    </div>
                    <div className="h-[21rem] ">
                      {isLoaded ? (
                        <GoogleMap
                          mapContainerClassName="w-full h-full relative"
                          center={{
                            lat: mapPos.lat,
                            lng: mapPos.lng,
                          }}
                          onClick={(e) => handleMapClick(e)}
                          zoom={11}
                          options={{
                            clickableIcons: false,
                          }}
                          onLoad={onLoad}
                        >
                          {mapPos && (
                            <Marker
                              position={{
                                lat: mapPos.lat,
                                lng: mapPos.lng,
                              }}
                            />
                          )}
                          {/* <Autocomplete
                          onLoad={onLoadAuto}
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            type="text"
                            // value={locationDescription}
                            // onChange={(e) => setLocationDescription(e.target.value)}
                            className="
                    p-2 text-sm w-54 outline-none bg-gray-50 rounded-sm border border-gray-300 
                    focus:ring-cloud-theme-blue focus:border-cloud-theme-blue absolute"
                            placeholder="eg: Nairobi, Kilimani"
                          />
                        </Autocomplete> */}
                        </GoogleMap>
                      ) : (
                        <div className="h-16 sm:h-auto">
                          <p>Fetching map ...</p>
                        </div>
                      )}
                    </div>
                    {/* <MapContainer
                    center={[-1.26538479248, 36.81293735403939]}
                    zoom={7}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      noWrap={true}
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <AddMarker position={position} setPosition={setPosition} />
                  </MapContainer> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-md px-3 py-2 mb-5 overflow-hidden">
              <div>
                <button
                  onClick={toggleOtherFeatures}
                  type="button"
                  className="flex w-full justify-between items-center mb-0 py-1"
                >
                  <p className="font-semibold text-cloud-theme-blue text-lg">
                    Other Features *
                  </p>
                  {otherFeaturesAccordion ? <FaAngleUp /> : <FaAngleDown />}
                </button>
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
                  {/* <div className="py-2">
                    <div className="mb-2">
                      <p className="font-semibold text-cloud-theme-blue">
                        Property Size (<span>acres</span>) *
                      </p>

                      {popertySizeErr && (
                        <p className="font-semibold text-red-600 text-xs">
                          {popertySizeErr}
                        </p>
                      )}
                    </div>
                    <input
                      type="number"
                      value={popertySize}
                      onChange={(e) => setPropertySize(e.target.value)}
                      className="
                            p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
                            focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
                      placeholder="property size in acres"
                    />
                  </div> */}
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
                            Size of Plots (<span>ft</span>) *
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
                            Number of Plots *
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
                            Price per Plot (KES) *
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
                          placeholder="area to let square feet"
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
                          placeholder="building size"
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
                          placeholder="parking ratio "
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
                          placeholder="avg monthly cost"
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
                          placeholder="avg rental income"
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
                          placeholder="gross rent multiplier "
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
                          placeholder="Existing tenants"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : step === 2 ? (
          <div className="md:w-[35rem] xs-l:w-[30rem] xs-l:p-0 p-5 w-full mx-auto">
            <div>
              <h5 className="italic ">This section is optional</h5>
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
                  className="transition-max-height ease-in duration-300 pl-1"
                >
                  <div className="pt-2"></div>
                  <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                    <label htmlFor="Cash-Buyers-Only" className="w-full h-full">
                      Cash Buyers Only
                    </label>
                  </div>
                  <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                    <label
                      htmlFor="Financing Available"
                      className="w-full h-full"
                    >
                      Financing Available
                    </label>
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
                className="transition-max-height ease-in duration-300 pl-1"
              >
                <div className="pt-2"></div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="Flipping-deals" className="w-full h-full">
                    Flipping-Deals
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="Off-Plan" className="w-full h-full">
                    Off-Plan
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="Joint-Venture" className="w-full h-full">
                    Joint Venture
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="Income-Properties" className="w-full h-full">
                    Income Properties
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="For-Redevelopment" className="w-full h-full">
                    For Redevelopment
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label
                    htmlFor="Incomplete-Buildings"
                    className="w-full h-full"
                  >
                    Incomplete Buildings
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label
                    htmlFor="Institutional-Properties"
                    className="w-full h-full"
                  >
                    Institutional Properties
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="Destressed-Sale" className="w-full h-full">
                    Distressed Sale
                  </label>
                </div>
                <div className="relative flex justify-between items-center pl-0 py-2 hover:bg-blue-50">
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
                  <label htmlFor="Quick-Sale" className="w-full h-full">
                    Quick Sale
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-[35rem] xs-l:w-[30rem] xs-l:p-0 p-5 w-full mx-auto">
            <div className="shadow-md px-3 py-2 mb-5">
              <p className="font-semibold text-cloud-theme-blue text-lg">
                Property Images *
              </p>
              {imgsErr && (
                <p className="font-semibold text-red-600 text-xxs">{imgsErr}</p>
              )}
            </div>
            <div className="mt-1 flex relative justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="text-center">
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
                <div className="text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="
                    cursor-pointer bg-white rounded-md font-medium text-cloud-theme-blue 
                    hover:text-cloud-theme-blue underline"
                  >
                    <span>Click or drag and drop to upload image files</span>
                  </label>
                  <input
                    id="file-upload"
                    name="file-upload"
                    accept="image/png, image/jpeg, image/webp"
                    type="file"
                    multiple
                    onChange={(e) => imagesHandler(e)}
                    className="absolute w-full h-full top-0 left-0 opacity-0"
                  />
                </div>
              </div>
            </div>
            <div className="grid xs-l:grid-cols-3 grid-cols-2 gap-4 mt-4 p-2.5 bg-gray-100">
              {showImages(theImg)}
            </div>
            {property === "residential" || property === "commercial" ? (
              <>
                <div className="mb-3">
                  <div className="shadow-md px-3 py-2 mb-5 mt-3">
                    <p className="font-semibold text-cloud-theme-blue text-lg">
                      Property Main Image (Optional)
                    </p>
                  </div>
                  <input
                    accept="image/png, image/jpeg"
                    onChange={previewThumbImg}
                    multiple={false}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer 
              dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
                    id="thumb-nail"
                    type="file"
                  />
                </div>
                {thumbImgPreviewUrl ? (
                  <div className="mt-3">
                    <img
                      className="h-44 object-contain rounded-sm w-full"
                      alt="thumbnail plan"
                      src={thumbImgPreviewUrl}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <div className="shadow-md px-3 py-2 mb-5 mt-3">
                    <p className="font-semibold text-cloud-theme-blue text-lg">
                      Property House Plan Image (Optional)
                    </p>
                  </div>
                  {planImageErr && (
                    <p className="mb-2 text-red-500 text-xxs">{planImageErr}</p>
                  )}
                  <input
                    accept="image/png, image/jpeg"
                    // onChange={(e) => setPlanImage(e.target.files)}
                    onChange={previewPlanImg}
                    multiple={false}
                    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer 
              dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 p-2"
                    id="thumb"
                    type="file"
                  />
                </div>
                {planImgUrl ? (
                  <div className="mt-3">
                    <img
                      className="h-44 object-contain rounded-sm w-full"
                      alt="house plan"
                      src={planImgUrl}
                    />
                  </div>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}

            <div className="mt-2 p-3">
              {stepOneErr && (
                <p className="text-red-600 text-base font-semibold italic leading-loose">
                  {stepOneErr}
                </p>
              )}
              {stepTwoErr && (
                <p className="text-red-600 text-base font-semibold italic leading-loose">
                  Error in step two
                </p>
              )}
              {stepThreeErr && (
                <p className="text-red-600 text-base font-semibold italic leading-loose">
                  Error in step three
                </p>
              )}
            </div>
          </div>
        )}
        {step === 2 ? (
          <div className="md:w-[35rem] xs-l:w-[30rem] xs-l:p-0 p-5 w-full mx-auto grid grid-cols-2 gap-3 mt-5">
            <button
              className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </div>
        ) : step === 1 ? (
          <div className="flex w-40 mx-auto mt-5">
            <button
              className="bg-cloud-theme-blue text-white w-full text-center py-2 rounded-md shadow-lg"
              type="button"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          </div>
        ) : step === 3 ? (
          <div className="md:w-[35rem] xs-l:w-[30rem] xs-l:p-0 p-5 w-full mx-auto grid grid-cols-2 gap-3 mt-5">
            {addListingloading ? (
              <SpinOne />
            ) : (
              <>
                <button
                  className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
                  type="button"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
                <button
                  className="bg-cloud-theme-blue text-white text-center py-2 rounded-md shadow-lg"
                  type="submit"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        ) : (
          ""
        )}
      </form>
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
    } else {
    }
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
export default AddListings;
