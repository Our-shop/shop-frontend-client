import React, { FC, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { colors } from '../../../themes';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { addAddressSchema } from '../../delivery/validation-schemas/add-address.schema';
import storage from '../../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { addDeliveryItem, getActiveDeliveries } from '../../delivery/store/delivery.actions';
import { DeliveryDto } from '../../delivery/types/delivery-dto.type';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../../types/error.type';
import { useTranslation } from 'react-i18next';

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

interface AddressAddProps {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserAddAddressComp: FC<AddressAddProps> = ({ showAddModal, setShowAddModal }) => {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  //i18n
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  const handleSubmit = async (values: AddressFormValues) => {
    try {
      setLoading(true);
      const addData: Partial<DeliveryDto> = {
        city: values.city,
        address: values.address,
        phone: values.phone,
        userId: userId,
      };
      await dispatch(addDeliveryItem({ deliveryDto: addData })).then(() => {
        dispatch(getActiveDeliveries({ userId: userId }));
      });
      setShowAddModal(false);
    } catch (error) {
      if (isAxiosError<DefaultError>(error)) {
        setAlertOpen(true);
        setAlertText(error.response?.data.message || error.message);
      } else {
        setAlertOpen(true);
        setAlertText(`${t('validation:Ooops')}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  if (!showAddModal) {
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
                  {t('userProfile:Add-address')}
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
                      label={t('userProfile:City')}
                      name="city"
                      type="city"
                      placeholder={t('userProfile:Enter-city')}
                      fullWidth
                      required
                      sx={{ marginBottom: '10px' }}
                      helperText={<ErrorMessage name="city" />}
                      autoComplete={t('userProfile:City')}
                    />
                    <Field
                      as={TextField}
                      label={t('userProfile:Address')}
                      name="address"
                      placeholder={t('userProfile:Enter-address')}
                      type="address"
                      fullWidth
                      required
                      helperText={<ErrorMessage name="address" />}
                      autoComplete={t('userProfile:Address')}
                    />
                    <Field
                      as={TextField}
                      label={t('userProfile:Phone')}
                      name="phone"
                      placeholder={t('userProfile:Enter-phone')}
                      type="phone"
                      fullWidth
                      required
                      helperText={<ErrorMessage name="phone" />}
                      autoComplete={t('userProfile:Phone')}
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      sx={{ margin: '8px 0' }}
                      disabled={loading}
                    >
                      {loading ? `${t('userProfile:Loading')}` : `${t('userProfile:Add-address')}`}
                    </Button>
                  </Form>
                )}
              </Formik>
            </StyledPaper>
          </Grid>
        </StyledModal>
        <Snackbar
          open={alertOpen}
          autoHideDuration={5000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="error">
            {alertText}
          </Alert>
        </Snackbar>
      </StyledBackdrop>
    </>
  );
};

export default UserAddAddressComp;
