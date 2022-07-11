import React, { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const initialAddress = {
  source: "",
  comments: "",
  streetnumber: "",
  streetname: "",
  city: "",
  state: "",
  postal: "",
  country: "",
  apartment: "",
  full: "",
  google_formatted: "",
  formatted_address: "",
  zip: "",

  location_accuracy: "",
};

const scriptOptions: {
  googleMapsApiKey: string;
  libraries: (
    | "drawing"
    | "geometry"
    | "localContext"
    | "places"
    | "visualization"
  )[];
} = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY || "",
  libraries: ["places"],
};

interface ISources {
  value: string;
  label: string;
}

const sources: ISources[] = [
  { value: "Paper Card", label: "Paper Card" },
  { value: "On the Ground", label: "On the Ground" },
  { value: "UC List", label: "UC List" },
];

export const useAddressEditModal = ({
  data,
  handleClose,
  onChangeAddress,
}: {
  data: any;
  handleClose: () => void;
  onChangeAddress: any;
}) => {
  const [address, setAddress] = React.useState(initialAddress);

  useEffect(() => {
    setAddress(data?.address);
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    let update: any = { ...address };

    // @ts-ignore
    update[e.target.name] = e.target.value;
    setAddress(update);
  };

  // Handle the keypress for input
  const onKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // On enter pressed
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };
  const { isLoaded, loadError } = useLoadScript(scriptOptions);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [autocompleteBoolean, setAutocompleteBoolean] = useState<any>(null);
  const inputEl = useRef(null);

  const apartmentInputReference = useRef(null);

  useEffect(() => {
    if (autocompleteBoolean) {
      apartmentInputReference &&
        apartmentInputReference.current &&
        // @ts-ignore
        apartmentInputReference.current.focus();
      setAutocompleteBoolean(false);
    }
  }, [autocompleteBoolean]);

  const onLoad = (autocompleteObj: any) => {
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = () => {
    let autoAddress = {
      ...address,
      streetnumber: "",
      streetname: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      full: "",
    };
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setAutocompleteBoolean(true);

      let fullAddress: any[] = [];
      console.log(place);
      if ("address_components" in place) {
        place["address_components"].forEach((item: any) => {
          if (item["types"][0] == "street_number" && item["long_name"]) {
            autoAddress = { ...autoAddress, streetnumber: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "route" && item["long_name"]) {
            autoAddress = { ...autoAddress, streetname: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "locality" && item["long_name"]) {
            autoAddress = { ...autoAddress, city: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (
            item["types"][0] == "administrative_area_level_1" &&
            item["long_name"]
          ) {
            autoAddress = { ...autoAddress, state: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "postal_code" && item["long_name"]) {
            autoAddress = { ...autoAddress, postal: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "country" && item["long_name"]) {
            autoAddress = { ...autoAddress, country: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
        });

        autoAddress = { ...autoAddress, full: fullAddress.join(", ") };
        setAddress(autoAddress);
      }
    }
  };

  const onSave = () => {
    onChangeAddress(address);
    handleClose();
    setAddress(initialAddress);
  };
  const onCancel = () => {
    handleClose();
    setAddress(initialAddress);
  };
  return {
    address,
    functions: { handleSubmit, onKeypress, handleChange, onSave, onCancel },
    isLoaded,
    onLoad,
    onPlaceChanged,
    sources,
    apartmentInputReference,
  };
};
