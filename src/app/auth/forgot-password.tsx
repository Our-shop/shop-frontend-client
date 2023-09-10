import React, { FC, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Alert, Avatar, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';
import { forgotPswSchema } from './validation-schemas/forgot-psw.schema';
import storage from '../../local-storage/storage';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../types/error.type';
import { forgotPassword } from './api/forgot-password';
import { ForgotPasswordDto } from './types/forgot-password-dto.type';
import { useTranslation } from 'react-i18next';

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
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { t } = useTranslation();

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const initialValues: FormValues = {
    email: '',
  };

  const handleSubmit = async (values: FormValues, props: any) => {
    const email = values.email;

    try {
      setLoading(true);

      const forgotPasswordDto: ForgotPasswordDto = {
        email: email,
      };

      const { data } = await forgotPassword(forgotPasswordDto);

      storage.set('resetToken', data);
      // eslint-disable-next-line react/prop-types
      props.resetForm();
      navigate('/auth/reset-password');
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

  return (
    <Grid container justifyContent="center">
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <LockResetIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            {t('forgotPassword:Forgot-password')}
          </Typography>
        </Grid>
        <Typography variant="h6" marginBottom={3} textAlign={'center'}>
          {t('forgotPassword:To-restore-password')}
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
                label={t('forgotPassword:Email')}
                placeholder={t('forgotPassword:Enter-email')}
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
                disabled={loading}
              >
                {loading
                  ? `${t('forgotPassword:Loading')}`
                  : `${t('forgotPassword:Restore-password')}`}
              </Button>
            </Form>
          )}
        </Formik>
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

export default ForgotPasswordPage;
