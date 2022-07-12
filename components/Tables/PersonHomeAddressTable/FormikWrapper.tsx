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
  const [mutateFunction, { loading: creatingLoading }] =
    useMutation(CREATE_HOME_ADDRESS);

  const router = useRouter();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HomeAddressSchema}
      onSubmit={(values) => {
        if (router.query.id) {
          mutateFunction({
            variables: { ...values, pid: router.query.id },
          }).then((data) => {
            refetch();
            handleClose();
            console.log(data);
          });
        }
      }}
    >
      {(formikData) => <>{children({ formikData })}</>}
    </Formik>
  );
};

export default FormikWrapper;
