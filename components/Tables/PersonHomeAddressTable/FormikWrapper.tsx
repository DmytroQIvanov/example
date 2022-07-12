import React from "react";
import { Formik } from "formik";
import { HomeAddressSchema } from "./ValidationShema";
import { useMutation } from "@apollo/client";
import { CREATE_HOME_ADDRESS } from "../../../shemas/HomeAddressShemas";
import { useRouter } from "next/router";

const FormikWrapper = ({
  children,
  initialValues,
  handleClose,
  refetch,
}: {
  children: ({ formikData }: { formikData: any }) => React.ReactNode;
  initialValues: any;
  handleClose: () => void;
  refetch: () => void;
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HomeAddressSchema}
      onSubmit={(values) => {}}
    >
      {(formikData) => <>{children({ formikData })}</>}
    </Formik>
  );
};

export default FormikWrapper;
