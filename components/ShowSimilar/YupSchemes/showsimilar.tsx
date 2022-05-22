import * as Yup from 'yup';

export const AreaSchema = Yup.object().shape({
  city: Yup.string().required('city is required'),
  principle: Yup.string().required('city is required'),
  // password: Yup.string()
  //   .required('Password is required')
  //   .min(4, 'Password is too short - should be 4 chars minimum'),
});
