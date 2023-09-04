import React, { FC } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';
import { forgotPswSchema } from './validation-schemas/forgot-psw.schema';

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
}

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    email: '',
  };

  const handleSubmit = (values: FormValues, props: any) => {
    console.log('Form values:', values);

    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
      navigate('/auth/reset-password');
    }, 500);

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
            Forgot password
          </Typography>
        </Grid>
        <Typography variant="h6" marginBottom={3} textAlign={'center'}>
          To restore the password please enter your email:
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={forgotPswSchema}
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
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ margin: '20px auto 8px' }}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Loading' : 'Restore password'}
              </Button>
            </Form>
          )}
        </Formik>
      </StyledPaper>
    </Grid>
  );
};

export default ForgotPasswordPage;
