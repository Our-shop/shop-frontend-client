import React, { FC, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { getCartItems } from '../store/carts.actions';
import { useSelector } from 'react-redux';
import { cartItemsSelector, cartSelector, cartsPendingSelector } from '../store/carts.selector';
import { Stack, Typography, MenuItem, Button, Snackbar, Alert } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {
  deliveriesPendingSelector,
  deliveryItemsSelector,
} from '../../delivery/store/delivery.selectors';
import { getActiveDeliveries } from '../../delivery/store/delivery.actions';
import Badge from '@mui/material/Badge';
import repository from '../../../repository';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MakeOrderModalProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const MakeOrderModalComp: FC<MakeOrderModalProps> = ({ isOpened, setIsOpened }) => {
  const dispatch = useDispatch<AppDispatch>();

  // CART
  const cart = useSelector(cartSelector);
  const cartItems = useSelector(cartItemsSelector);
  const cartsPending = useSelector(cartsPendingSelector);

  // DELIVERY
  const deliveryItems = useSelector(deliveryItemsSelector);
  const deliveriesPending = useSelector(deliveriesPendingSelector);

  const [currentDelivery, setCurrentDelivery] = useState('');

  useEffect(() => {
    isOpened && cart && dispatch(getCartItems({ cartId: cart.id }));
    isOpened && cart && dispatch(getActiveDeliveries({ userId: cart.userId }));
  }, [isOpened]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setCurrentDelivery(event.target.value as string);
  };

  // MAKE ORDER
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //i18n
  const { t } = useTranslation();

  const totalAmount = cartItems.reduce(
    (totalAmount, cartItem) => (totalAmount += cartItem.productQuantity * cartItem.product.price),
    0,
  );

  const confirmOrder = async () => {
    setCurrentDelivery('');

    try {
      const res = await repository.post('orders/' + cart?.id, { deliveryId: currentDelivery });
      if (typeof res.data == 'string') {
        setAlertOpen(true);
        setErrorMessage(res.data);
      } else {
        navigate('/products');
        window.location.reload();
      }
    } catch (error: any) {
      setAlertOpen(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <Modal
        open={isOpened}
        onClose={() => setIsOpened(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={{ outline: 'none' }}>
          <Card elevation={0} sx={{ padding: 5 }}>
            {cartsPending.cartItems ? (
              <div>{t('makeOrder:Loading')}</div>
            ) : (
              <Stack direction="row" justifyContent="space-between" gap={10}>
                <Stack direction="column" gap={3}>
                  {cartItems.map((item) => (
                    <Stack direction="row" alignItems="center" gap={3} key={item.id}>
                      <Stack width={80} direction="row" justifyContent="center">
                        <Badge badgeContent={item.productQuantity} color="error">
                          <img src={item.product.image} height={60}></img>
                        </Badge>
                      </Stack>

                      <Typography>{item.product.title}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Stack direction="column" justifyContent="space-between" width={300} gap={3}>
                  {deliveriesPending.deliveryItems ? (
                    <div>{t('makeOrder:Loading')}</div>
                  ) : (
                    <FormControl fullWidth>
                      <InputLabel id="delivery-label">{t('makeOrder:Delivery-address')}</InputLabel>
                      <Select
                        labelId="delivery-label"
                        label={t('makeOrder:Delivery-address')}
                        value={currentDelivery}
                        onChange={handleSelectChange}
                      >
                        {deliveryItems.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            <Typography>
                              {item.city}: {item.address}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <Stack direction="column">
                    <Typography>Total amount: ${totalAmount.toFixed(2)}</Typography>
                    <Button
                      variant="contained"
                      color="success"
                      disabled={!currentDelivery}
                      onClick={confirmOrder}
                    >
                      {t('makeOrder:Confirm')}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Card>
        </Box>
      </Modal>

      <Snackbar
        open={alertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MakeOrderModalComp;
