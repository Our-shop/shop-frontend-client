import React, { FC, useState } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import { Alert, Avatar, Button, Grid, Paper, Snackbar, TextField, Typography } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { colors } from '../../themes';
import { styled } from '@mui/material/styles';
import { resetPswSchema } from './validation-schemas/reset-psw.schema';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../types/error.type';
import { resetPassword } from './api/reset-password';
import storage from '../../local-storage/storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
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
  newPsw: string;
  confirmNewPsw: string;
}

const ResetPasswordPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const { t } = useTranslation();

  const initialValues: FormValues = {
    email: '',
    newPsw: '',
    confirmNewPsw: '',
  };

  const navigate = useNavigate();

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async (values: FormValues, props: any) => {
    try {
      setLoading(true);
      const resetPasswordDto = {
        email: values.email,
        newPassword: values.newPsw,
      };
      const resetToken = storage.get('resetToken');

      await resetPassword(resetPasswordDto, resetToken as string);

      props.resetForm();
      props.setSubmitting(false);

      navigate('/');
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
            {t('resetPassword:Reset-password')}
          </Typography>
        </Grid>
        <Typography variant="h6" marginBottom={3} textAlign={'center'}>
          {t('resetPassword:Please-enter')}
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
                label={t('resetPassword:Email')}
                placeholder={t('resetPassword:Enter-email')}
                type="email"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="email"
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label={t('resetPassword:New-password')}
                placeholder={t('resetPassword:Enter-new-password')}
                type="password"
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="newPsw"
                helperText={<ErrorMessage name="newPsw" />}
              />
              <Field
                as={TextField}
                label={t('resetPassword:Duplicate-new-password')}
                placeholder={t('resetPassword:Duplicate-new-password')}
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
                disabled={loading}
              >
                {loading ? `${t('resetPassword:Loading')}` : `${t('resetPassword:Save')}`}
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

export default ResetPasswordPage;
