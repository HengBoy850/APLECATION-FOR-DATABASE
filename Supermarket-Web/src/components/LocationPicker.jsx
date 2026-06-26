// import { useState, useRef, useCallback } from "react";
// import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from "@react-google-maps/api";

// const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// const LIBRARIES = ["places"];

// // Default center: Phnom Penh
// const DEFAULT_CENTER = { lat: 11.5564, lng: 104.9282 };

// export default function LocationPicker({ onSelect, onClose }) {
//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//     libraries: LIBRARIES,
//   });

//   const [marker, setMarker] = useState(DEFAULT_CENTER);
//   const [addressText, setAddressText] = useState("");
//   const autocompleteRef = useRef(null);
//   const geocoderRef = useRef(null);

//   const onAutocompleteLoad = (ac) => {
//     autocompleteRef.current = ac;
//   };

//   const onPlaceChanged = () => {
//     const place = autocompleteRef.current?.getPlace();
//     if (!place?.geometry) return;
//     const loc = {
//       lat: place.geometry.location.lat(),
//       lng: place.geometry.location.lng(),
//     };
//     setMarker(loc);
//     setAddressText(place.formatted_address || place.name || "");
//   };

//   const reverseGeocode = useCallback((loc) => {
//     if (!window.google) return;
//     if (!geocoderRef.current) {
//       geocoderRef.current = new window.google.maps.Geocoder();
//     }
//     geocoderRef.current.geocode({ location: loc }, (results, status) => {
//       if (status === "OK" && results[0]) {
//         setAddressText(results[0].formatted_address);
//       }
//     });
//   }, []);

//   const handleMapClick = (e) => {
//     const loc = { lat: e.latLng.lat(), lng: e.latLng.lng() };
//     setMarker(loc);
//     reverseGeocode(loc);
//   };

//   const handleConfirm = () => {
//     onSelect({
//       address: addressText || `${marker.lat.toFixed(5)}, ${marker.lng.toFixed(5)}`,
//       lat: marker.lat,
//       lng: marker.lng,
//     });
//   };

//   const keyMissing =
//     !GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE";

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
//       <div className="bg-white w-full sm:max-w-lg sm:rounded-xl2 rounded-t-2xl max-h-[90vh] overflow-hidden flex flex-col">
//         <div className="flex items-center justify-between px-4 py-3 border-b border-market-line">
//           <h2 className="font-display font-bold">Choose delivery location</h2>
//           <button onClick={onClose} className="text-market-ink/50 hover:text-market-ink text-xl leading-none">
//             ✕
//           </button>
//         </div>

//         <div className="p-4 flex-1 overflow-y-auto">
//           {keyMissing ? (
//             <div className="text-sm text-market-orangeDark bg-market-orange/10 p-3 rounded-lg">
//               Google Maps API key not configured yet. Add your key to{" "}
//               <code className="bg-white px-1 rounded">VITE_GOOGLE_MAPS_API_KEY</code> in
//               the <code className="bg-white px-1 rounded">.env</code> file to enable the
//               map picker. For now, you can type your address directly below.
//               <input
//                 type="text"
//                 placeholder="Type your delivery address"
//                 value={addressText}
//                 onChange={(e) => setAddressText(e.target.value)}
//                 className="w-full mt-3 px-4 py-2.5 border border-market-line rounded-lg bg-white focus:border-market-green outline-none"
//               />
//             </div>
//           ) : loadError ? (
//             <p className="text-sm text-market-orangeDark">
//               Failed to load Google Maps. Check your API key and network connection.
//             </p>
//           ) : !isLoaded ? (
//             <p className="text-sm text-market-ink/50 py-8 text-center">Loading map...</p>
//           ) : (
//             <>
//               <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
//                 <input
//                   type="text"
//                   placeholder="Search for a street, building, or landmark..."
//                   className="w-full px-4 py-2.5 border border-market-line rounded-lg bg-white focus:border-market-green outline-none mb-3"
//                 />
//               </Autocomplete>

//               <div className="rounded-lg overflow-hidden border border-market-line">
//                 <GoogleMap
//                   mapContainerStyle={{ width: "100%", height: "280px" }}
//                   center={marker}
//                   zoom={15}
//                   onClick={handleMapClick}
//                 >
//                   <Marker position={marker} />
//                 </GoogleMap>
//               </div>

//               {addressText && (
//                 <p className="text-sm text-market-ink/70 mt-3">
//                   📍 {addressText}
//                 </p>
//               )}
//             </>
//           )}
//         </div>

//         <div className="p-4 border-t border-market-line">
//           <button
//             onClick={handleConfirm}
//             disabled={!addressText}
//             className="w-full bg-market-green text-white font-semibold py-2.5 rounded-lg hover:bg-market-greenDark disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Use this location
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";

const DEFAULT_CENTER = [11.5564, 104.9282];

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({
  position,
  setPosition,
  setAddressText,
}) {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPosition([lat, lng]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        setAddressText(data.display_name || "");
      } catch {
        setAddressText(`${lat}, ${lng}`);
      }
    },
  });

  return <Marker position={position} />;
}

export default function LocationPicker({
  onSelect,
  onClose,
}) {
  const [position, setPosition] =
    useState(DEFAULT_CENTER);

  const [addressText, setAddressText] =
    useState("");

  const handleConfirm = () => {
    onSelect({
      address:
        addressText ||
        `${position[0]}, ${position[1]}`,
      lat: position[0],
      lng: position[1],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden">

        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold">
            Choose delivery location
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="p-4">
          <MapContainer
            center={position}
            zoom={15}
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
              position={position}
              setPosition={setPosition}
              setAddressText={setAddressText}
            />
          </MapContainer>

          {addressText && (
            <div className="mt-3 text-sm">
              📍 {addressText}
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleConfirm}
            disabled={!addressText}
            className="w-full py-3 bg-green-600 text-white rounded-lg"
          >
            Use this location
          </button>
        </div>
      </div>
    </div>
  );
}