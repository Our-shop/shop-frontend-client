import React, { FC } from 'react';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { colors } from '../../../themes';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { addAddressSchema } from '../../delivery/validation-schemas/add-address.schema';
import { GetDeliveryData } from '../types/get-delivery-data.type';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import storage from '../../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import { editDeliveryItem, getActiveDeliveries } from '../../delivery/store/delivery.actions';

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

const initialValues: AddressFormValues = {
  city: '',
  address: '',
  phone: '',
};

export interface AddressFormValues {
  city: string;
  address: string;
  phone: string;
}

interface AddressEditProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  activeAddress: GetDeliveryData;
  addressForEditId: string;
}

const UserEditAddressComp: FC<AddressEditProps> = ({
  showModal,
  setShowModal,
  activeAddress,
  addressForEditId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  const handleSubmit = async (values: AddressFormValues) => {
    const addData = {
      city: values.city,
      address: values.address,
      phone: values.phone,
      userId: userId,
    };
    await dispatch(editDeliveryItem({ id: addressForEditId, updatedDelivery: addData })).then(
      () => {
        dispatch(getActiveDeliveries({ userId: userId }));
      },
    );
    setShowModal(false);
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

export default UserEditAddressComp;
