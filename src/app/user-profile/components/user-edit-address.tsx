import React, { FC, useEffect, useState } from 'react';
import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { styled } from '@mui/material/styles';
import { colors } from '../../../themes';
import { addAddressSchema } from '../validation-schemas/add-address.schema';
import { useNavigate } from 'react-router-dom';
import { getAddress } from '../api/ user-address';

const StyledBackdrop = styled(Box)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StyledModal = styled(Paper)`
  padding: 20px;
  width: 400px;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 400px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const initialValues: FormValues = {
  city: '',
  address: '',
  phone: '',
};

interface FormValues {
  city: string;
  address: string;
  phone: string;
}

interface AddressEditProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  addressId: string;
}

const UserEditAddress: FC<AddressEditProps> = ({ showModal, setShowModal, addressId }) => {
  const [address, setAddress] = useState(initialValues);

  const navigate = useNavigate();
  const userId = '6c221a3c-38bc-43fb-91ba-4a88fb17f4f4';

  // getAddress(addressId)
  //   .then((currentAddress) => {
  //     console.log(currentAddress.data);
  //   })
  //   .catch((error) => {
  //     return error;
  //   });

  // console.log(res);

  // const initialData = {
  //   city: currentAddress.data.city,
  //   address: currentAddress.data.address,
  //   phone: currentAddress.data.phone,
  // };
  const fetchData = async () => {
    try {
      const currentAddress = await getAddress(addressId);
      setAddress(currentAddress.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(address);
  }, [showModal, addressId]);

  const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    setAddress(Object.assign(address, values));
    const addData = {
      userId: userId,
      ...address,
    };
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return <></>;
  }

  return (
    <>
      <StyledBackdrop onClick={handleCloseModal}>
        <StyledModal elevation={10} onClick={(e) => e.stopPropagation()}>
          <Grid container justifyContent="center">
            <StyledPaper elevation={10}>
              <Grid container direction="column" alignItems="center">
                <StyledAvatar>
                  <HomeIcon />
                </StyledAvatar>
                <Typography variant="h5" marginBottom={3}>
                  Edit address
                </Typography>
              </Grid>
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={addAddressSchema}
              >
                {(FormikProps) => (
                  <Form>
                    <Field
                      as={TextField}
                      label="City"
                      name="city"
                      type="city"
                      placeholder="Enter city"
                      fullWidth
                      required
                      sx={{ marginBottom: '10px' }}
                      helperText={<ErrorMessage name="city" />}
                      autoComplete="city"
                    />
                    <Field
                      as={TextField}
                      label="Address"
                      name="address"
                      placeholder="Enter address"
                      type="address"
                      fullWidth
                      required
                      helperText={<ErrorMessage name="address" />}
                      autoComplete="address"
                    />
                    <Field
                      as={TextField}
                      label="Phone"
                      name="phone"
                      placeholder="Enter phone"
                      type="phone"
                      fullWidth
                      required
                      helperText={<ErrorMessage name="phone" />}
                      autoComplete="phone"
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{ margin: '8px 0' }}
                      disabled={FormikProps.isSubmitting}
                    >
                      {FormikProps.isSubmitting ? 'Loading' : 'Edit Address'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </StyledPaper>
          </Grid>
        </StyledModal>
      </StyledBackdrop>
    </>
  );
};

export default UserEditAddress;
