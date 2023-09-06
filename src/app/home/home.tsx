import React, { FC, useEffect, useState } from 'react';
import storage from '../../local-storage/storage';
import { Alert, Snackbar, styled } from '@mui/material';

const PageLayoutComp = styled('main')({
  padding: 16,
});

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
        <>Home</>
      )}
    </PageLayoutComp>
  );
};

export default Home;
