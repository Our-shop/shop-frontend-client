import React, { FC } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../../themes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { NavLink as RouterLink } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { signInSchema } from './validation-schemas/sign-in.schema';
import BackHomeBtn from '../../components/ui/back.btn.comp';

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

interface FormValues {
  email: string;
  password: string;
}

const SignInPage: FC = () => {
  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (values: FormValues, props: any) => {
    console.log('Form values:', values);

    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
      // TODO add navigation to main page after sign-in
    }, 2000);
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Sign In
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                helperText={<ErrorMessage name="email" />}
                autoComplete="email"
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
                autoComplete="password"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0' }}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Loading' : 'Sign in'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography sx={{ marginTop: '5px' }}>
          <Link component={RouterLink} to="/auth/forgot-password">
            Forgot password?
          </Link>
        </Typography>
        <Typography sx={{ marginTop: '5px' }}>Do you have an account?</Typography>
        <Typography sx={{ marginBottom: '15px' }}>
          <Link component={RouterLink} to="/auth/sign-up">
            Sign Up
          </Link>
        </Typography>
        <BackHomeBtn />
      </StyledPaper>
    </Grid>
  );
};

export default SignInPage;
