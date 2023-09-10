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
import { styled } from '@mui/material/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { colors } from '../../../themes';
import { useDispatch } from 'react-redux';
import storage from '../../../local-storage/storage';
import jwt_decode from 'jwt-decode';
import { isAxiosError } from 'axios';
import { DefaultError } from '../../../types/error.type';
import { UserFormValues } from '../../user/types/user-form-values.type';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { editUserSchema } from '../../user/validation-schemas/edit-user.schema';
import { editUser } from '../../user/store/user.actions';
import { AppDispatch } from '../../../store';
import { useTranslation } from 'react-i18next';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  min-height: 40vh;
  width: 350px;
`;

const StyledAvatar = styled(Avatar)`
  background-color: ${colors.lightViolet};
  margin-bottom: 10px;
`;

const EditUserComp: FC = () => {
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const { t } = useTranslation();

  const initialValues: UserFormValues = {
    userName: '',
    email: '',
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const dispatch = useDispatch<AppDispatch>();

  const token = storage.get('access-token') as string;
  const payload: { id: string; email: string; roleId: string; permissions: [] } = jwt_decode(token);
  const userId = payload.id;

  const handleSubmit = async (values: UserFormValues, props: any) => {
    try {
      setLoading(true);

      const updatedData = {
        userName: values.userName,
        email: values.email,
      };

      await dispatch(editUser({ userId: userId, updatedUser: updatedData }));

      // eslint-disable-next-line react/prop-types
      props.resetForm();
      setSuccessMessage(true);
      setAlertOpen(true);
      setAlertText(`${t('userProfile:Saved-successfully')}`);
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
    <StyledBox>
      <StyledPaper elevation={10}>
        <Grid container direction="column" alignItems="center">
          <StyledAvatar>
            <ManageAccountsIcon />
          </StyledAvatar>
          <Typography variant="h5" marginBottom={3}>
            {t('userProfile:User-settings')}
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={editUserSchema}
        >
          {() => (
            <Form>
              <Field
                as={TextField}
                label={t('userProfile:User-name')}
                placeholder={t('userProfile:Enter-name')}
                fullWidth
                required
                sx={{ marginBottom: '10px' }}
                name="userName"
                helperText={<ErrorMessage name="userName" />}
              />
              <Field
                as={TextField}
                label={t('userProfile:Email')}
                placeholder={t('userProfile:Enter-email')}
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
                fullWidth
                sx={{ margin: '8px 0' }}
                disabled={loading}
              >
                {loading ? `${t('userProfile:Loading')}` : `${t('userProfile:Save')}`}
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
        {successMessage ? (
          <Alert variant="filled" severity="success">
            {alertText}
          </Alert>
        ) : (
          <Alert variant="filled" severity="error">
            {alertText}
          </Alert>
        )}
      </Snackbar>
    </StyledBox>
  );
};

export default EditUserComp;
