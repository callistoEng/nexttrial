import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const Addresses = ({setPosition, setMapPos,setLocationDescription }) => {
  // const [gmapsLoaded, setGmapsLoaded] = useState(false);
  //   useEffect(() => {
  //     window.initMap = () => setGmapsLoaded(true);
  //     const gmapScriptEl = document.createElement(`script`);
  //     gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
  //     document
  //       .querySelector(`body`)
  //       .insertAdjacentElement(`beforeend`, gmapScriptEl);
  //   }, []);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const handleSelect = async (address) => {
    setValue(address, false);
    setLocationDescription(address)
    clearSuggestions(); 

    const address_found = await getGeocode({ address: address });
    const { lat, lng } = getLatLng(address_found[0]);
    setMapPos({lat,lng})
    setPosition([lat,lng])  
  };
  return (
    <div className="z-1030">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          className="
        p-2 text-sm w-full outline-none bg-gray-50 rounded-sm border border-gray-300 
        focus:ring-cloud-theme-blue focus:border-cloud-theme-blue"
          placeholder="Search an address from the map"
          value={value}
          disabled={!ready}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Addresses;
