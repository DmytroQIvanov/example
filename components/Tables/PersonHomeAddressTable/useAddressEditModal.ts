import React, { useEffect, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useMutation, useQuery } from "@apollo/client";
import { PERSON_DATA } from "../../../shemas/PersonGraphqlShemas";
import {
  CREATE_HOME_ADDRESS,
  INFORMATION_SOURCES_LIST,
  UPDATE_HOME_ADDRESS,
} from "../../../shemas/HomeAddressShemas";
import { useRouter } from "next/router";
import { RowStateTypes } from "../TablesComponents/Interfaces/TableWrapperInterfaces";

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
  initialAddress,
  refetch,
  rowState,
}: {
  data?: any;
  handleClose: () => void;
  onChangeAddress: any;
  initialAddress: any;
  refetch?: Function;
  rowState?: RowStateTypes;
}) => {
  const [address, setAddress] = React.useState(initialAddress);

  useEffect(() => {
    setAddress({
      ...data?.address,
      source:
        data?.address?.information_source_type?.information_source_type_id,
    });
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    let update: any = { ...address };

    // @ts-ignore
    update[e.target.name] = e.target.value;
    console.log(update[e.target.name]);
    console.log(e.target.value);

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
  const [mutateFunction, { loading: creatingLoading }] =
    useMutation(CREATE_HOME_ADDRESS);
  const router = useRouter();

  const [updateFunction, { loading: updateHomeAddressLoading }] =
    useMutation(UPDATE_HOME_ADDRESS);

  useEffect(() => {
    if (address?.source) {
      setErrors({ source: false });
    }
  }, [address]);
  const onSubmit = () => {
    if (!address?.source) {
      setErrors({ source: true });
      return;
    }
    if (router.query.id) {
      if (rowState === "add") {
        mutateFunction({
          variables: { ...address, pid: router.query.id },
        }).then((data) => {
          onChangeAddress(address);
          refetch && refetch();
          setAddress(initialAddress);
          handleClose();
          setErrors({ source: false });
        });
      }
      if (rowState === "change") {
        updateFunction({ variables: { ...address } }).then((data) => {
          onChangeAddress(address);
          setAddress(initialAddress);
          refetch && refetch();
          handleClose();
          setErrors({ source: false });
        });
      }
    }
  };
  const { isLoaded, loadError } = useLoadScript(scriptOptions);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [autocompleteBoolean, setAutocompleteBoolean] = useState<any>(null);
  const [errors, setErrors] = useState({ source: false });

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
      street_number: "",
      street_name: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      full: "",
    };
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setAutocompleteBoolean(true);

      let fullAddress: any[] = [];
      // a.log(place);
      console.log(place);
      if ("address_components" in place) {
        place["address_components"].forEach((item: any) => {
          if (item["types"][0] == "street_number" && item["long_name"]) {
            autoAddress = { ...autoAddress, street_number: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "route" && item["long_name"]) {
            autoAddress = { ...autoAddress, street_name: item["long_name"] };
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
            autoAddress = { ...autoAddress, zip_code: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
          if (item["types"][0] == "country" && item["long_name"]) {
            autoAddress = { ...autoAddress, country: item["long_name"] };
            fullAddress.push(item["long_name"]);
          }
        });

        autoAddress = { ...autoAddress, full: fullAddress.join(", ") };
        console.log(autoAddress);
        setAddress(autoAddress);
      }
    }
  };

  const onSave = () => {
    onSubmit();
    // handleClose();
  };
  const onCancel = () => {
    handleClose();
    setAddress(initialAddress);
  };

  const { data: information_sources_list, loading } = useQuery(
    INFORMATION_SOURCES_LIST
  );
  return {
    address,
    functions: { handleSubmit, onKeypress, handleChange, onSave, onCancel },
    isLoaded,
    onLoad,
    onPlaceChanged,
    sources,
    apartmentInputReference,
    initialAddress,
    errors,
    loading: creatingLoading || updateHomeAddressLoading,
    data: {
      informationSources: {
        loading,
        data: information_sources_list?.information_source_type,
      },
    },
  };
};
