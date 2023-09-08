import React, { FC, useEffect, useState } from 'react';
import storage from '../../local-storage/storage';
import {
  Alert,
  Button,
  Container,
  keyframes,
  Link,
  Snackbar,
  styled,
  Typography,
} from '@mui/material';
import { colors } from '../../themes';
import { NavLink as RouterLink } from 'react-router-dom';

const PageLayoutComp = styled('main')({
  padding: 16,
});

const WelcomeSection = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AnimatedTypography = styled(Typography)`
  margin-top: 10px;
  font-size: 1.2em;
  animation: ${fadeIn} 1.5s ease-in-out infinite;
`;

const Image = styled('img')`
  max-width: 100%;
  width: 50%;
  height: auto;
  margin-bottom: 16px;
`;

const Home: FC = () => {
  const [showMessage, SetShowMessage] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState('');

  const closeAlert = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const resetToken = storage.get('resetToken');
    if (resetToken) {
      SetShowMessage(true);
      setAlertOpen(true);
      setAlertText('Password was successfully changed');
      storage.clear();
    }
  }, []);

  return (
    <PageLayoutComp>
      {showMessage ? (
        <Snackbar
          open={alertOpen}
          autoHideDuration={5000}
          onClose={closeAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ marginTop: '50px' }}
        >
          <Alert variant="filled" severity="success">
            {alertText}
          </Alert>
        </Snackbar>
      ) : (
        <>
          <WelcomeSection>
            <Image
              src="https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043.jpg?w=954&h=636"
              alt="Dog Image"
            />
            <Typography variant="h4" gutterBottom>
              Welcome to Our Pet Shop!
            </Typography>
            <Typography variant="body1" paragraph>
              We have everything for your beloved pets!
            </Typography>
            <Link component={RouterLink} to="/products">
              <Button variant="contained" color="primary" size="large">
                Explore Products
              </Button>
            </Link>
            <AnimatedTypography variant="body2" color={colors.error}>
              Get 10% off your first order!
            </AnimatedTypography>
          </WelcomeSection>
        </>
      )}
    </PageLayoutComp>
  );
};

export default Home;
