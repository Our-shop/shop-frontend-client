import React, { FC, useState } from 'react';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { styled } from '@mui/material/styles';
import { colors } from '../../themes';
import { addAddressSchema } from './validation-schemas/add-address.schema';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { addAddress } from './api/ user-address';

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 50vh;
  width: 400px;
  margin: 50px auto 20px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const StyledBackBtn = styled(Button)`
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
`;

interface FormValues {
  city: string;
  address: string;
  phone: string;
}

const initialValues: FormValues = {
  city: '',
  address: '',
  phone: '',
};

const UserAddAddress: FC = () => {
  const [address, setAddress] = useState(initialValues);
  const navigate = useNavigate();
  const userId = '6c221a3c-38bc-43fb-91ba-4a88fb17f4f4';

  const handleSubmit = async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    setAddress(Object.assign(address, values));
    const addData = {
      userId: userId,
      ...address,
    };

    try {
      const res = await addAddress(addData);
      console.log(res);
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
      setTimeout(() => {
        navigate('/profile/delivery-details');
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <HomeIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Add address
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
                {FormikProps.isSubmitting ? 'Loading' : 'Add Address'}
              </Button>
            </Form>
          )}
        </Formik>
        <Link component={RouterLink} to="/profile" color={colors.white}>
          <StyledBackBtn variant="contained">Go Back</StyledBackBtn>
        </Link>
      </StyledPaper>
    </Grid>
  );
};

export default UserAddAddress;
