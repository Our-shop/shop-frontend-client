import React, { FC, useState } from 'react';
import {
  Alert,
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
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { signUpSchema } from './validation-schemas/sign-up.schema';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormHelperText } from '@mui/material';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';
import { SignUpFormValues } from './types/sign-up-form.type';
import { getRoleId } from './api/user-role.api';
import storage from '../../local-storage/storage';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../types/error.type';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { register } from './store/auth.slice';
import { AppDispatch } from '../../store';
import { signUp } from './store/auth.actions';
import { Tokens } from './types/tokens.type';
import { useTranslation } from 'react-i18next';

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 50vh;
  width: 400px;
  margin: 30px auto 30px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const SignUpPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { t } = useTranslation(['sign-up']);

  const initialValues: SignUpFormValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    acceptTerms: false,
  };

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: SignUpFormValues, props: any) => {
    try {
      setLoading(true);
      const roleId = await getRoleId(values.role);

      const newUser = {
        userName: values.userName,
        email: values.email,
        password: values.password,
        roleId: roleId.data,
      };

      const resultAction = await dispatch(signUp(newUser));
      const data = resultAction.payload as Tokens;

      storage.set('access-token', data.access_token);
      storage.set('refresh-token', data.refresh_token);
      storage.set('at_expired', data.at_expiration);
      storage.set('rt_expired', data.rt_expiration);

      const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(
        data.access_token,
      );
      dispatch(
        register({
          id: payload.id,
          email: payload.email,
          role_id: payload.roleId,
          permissions: payload.permissions,
          isRegistered: true,
        }),
      );

      props.resetForm();
      navigate('/');
    } catch (error) {
      if (isAxiosError<DefaultError>(error)) {
        setAlertOpen(true);
        setAlertText(error.response?.data.message || error.message);
      } else {
        setAlertOpen(true);
        setAlertText('Ooops...Something-went-wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            {t('sign-up')}
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
                disabled={loading}
              >
                {loading ? 'Loading' : 'Sign up'}
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
    </Grid>
  );
};

export default SignUpPage;
