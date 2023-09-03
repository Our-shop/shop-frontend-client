import React, { FC } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';
import { resetPswSchema } from './validation-schemas/reset-psw.schema';

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 50vh;
  width: 400px;
  margin: 50px auto 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

interface FormValues {
  email: string;
  newPsw: string;
  confirmNewPsw: string;
}

const ResetPasswordPage: FC = () => {
  const initialValues: FormValues = {
    email: '',
    newPsw: '',
    confirmNewPsw: '',
  };

  const handleSubmit = (values: FormValues, props: any) => {
    console.log('Form values:', values);

    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);

      // TODO navigate to main page after reset password
    }, 2000);

    console.log('Props:', props);
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockResetIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Reset password
          </Typography>
        </Grid>
        <Typography variant="h6" marginBottom={3} textAlign={'center'}>
          Please enter your email and new password:
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={resetPswSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                placeholder="Enter email"
                type="email"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="email"
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="New password"
                placeholder="Enter new password"
                type="password"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="newPsw"
                helperText={<ErrorMessage name="newPsw" />}
              />
              <Field
                as={TextField}
                label="Duplicate new password"
                placeholder="Duplicate new password"
                type="password"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="confirmNewPsw"
                helperText={<ErrorMessage name="confirmNewPsw" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0' }}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Loading' : 'Save'}
              </Button>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </Grid>
  );
};

export default ResetPasswordPage;
