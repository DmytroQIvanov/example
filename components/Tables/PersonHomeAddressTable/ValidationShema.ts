import * as Yup from "yup";

export const HomeAddressSchema = Yup.object({
  source: Yup.string().required("Source is required"),
});
