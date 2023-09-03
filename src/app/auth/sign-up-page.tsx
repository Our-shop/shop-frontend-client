import React, { FC } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { signUpSchema } from './validation-schemas/sign-up.schema';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormHelperText } from '@mui/material';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';

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
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  acceptTerms: boolean;
}

const SignUpPage: FC = () => {
  const initialValues: FormValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    acceptTerms: false,
  };

  const handleSubmit = (values: FormValues, props: any) => {
    console.log('Form values:', values);

    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
      // TODO add navigation to main page after sign-up
    }, 2000);

    console.log('Props:', props);
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            Sign Up
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                label="UserName"
                placeholder="Enter name"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="userName"
                helperText={<ErrorMessage name="userName" />}
              />
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
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="password"
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                label="Confirm password"
                placeholder="Confirm password"
                type="password"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="confirmPassword"
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <FormControl fullWidth>
                <FormLabel component="legend">Who are you?</FormLabel>
                <Field as={RadioGroup} aria-label="role" name="role" style={{ display: 'initial' }}>
                  <FormControlLabel value="user" control={<Radio />} label="user" />
                  <FormControlLabel value="admin" control={<Radio />} label="admin" />
                </Field>
              </FormControl>
              <FormHelperText>
                <ErrorMessage name="role" />
              </FormHelperText>
              <FormControlLabel
                control={<Field as={Checkbox} name="acceptTerms" />}
                label="I accept the terms and conditions."
              />
              <FormHelperText>
                <ErrorMessage name="acceptTerms" />
              </FormHelperText>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                sx={{ margin: '8px 0' }}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? 'Loading' : 'Sign up'}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography sx={{ marginTop: '5px' }}>Already registered?</Typography>
        <Typography>
          <Link component={RouterLink} to="/auth/sign-in">
            Sign in
          </Link>
        </Typography>
      </StyledPaper>
    </Grid>
  );
};

export default SignUpPage;
