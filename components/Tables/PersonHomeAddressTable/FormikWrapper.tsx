import React from "react";
import { Formik } from "formik";
import { HomeAddressSchema } from "./ValidationShema";
import { useMutation } from "@apollo/client";
import { CREATE_HOME_ADDRESS } from "../../../shemas/HomeAddressShemas";
import { useUser } from "@clerk/nextjs";

const FormikWrapper = ({
  children,
  initialValues,
}: {
  children: ({ formikData }: { formikData: any }) => React.ReactNode;
  initialValues: any;
}) => {
  const [mutateFunction, { loading: creatingLoading }] =
    useMutation(CREATE_HOME_ADDRESS);

  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={HomeAddressSchema}
      onSubmit={(values) => {
        console.log(values);

        if (user && user.id) {
          mutateFunction({ variables: { ...values, pid: user.id } }).then(
            (data) => {
              // goTo(data.data.insert_person.returning[0].person_id);
              // setEditStatus(0);
              console.log(data);
            }
          );
        }
      }}
    >
      {(formikData) => <>{children({ formikData })}</>}
    </Formik>
  );
};

export default FormikWrapper;
