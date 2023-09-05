import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { CartItemDto } from '../types/cart-item.dto';
import QuantityEditorComp from './quantity-editor';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { editProductQuantity, deleteCartItem } from '../store/carts.actions';

interface CartItemCompProps {
  cartItem: CartItemDto;
}

const CartItemComp: FC<CartItemCompProps> = ({ cartItem }) => {
  const dispatch = useDispatch<AppDispatch>();
  const product = cartItem.product;
  const [productQuantity, setProductQuantity] = useState(cartItem.productQuantity);

  const saveChanges = () => {
    dispatch(editProductQuantity({ ...cartItem, productQuantity }));
  };

  return (
    <TableRow hover>
      <TableCell align="center">
        <img src={product.image} height={60}></img>
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="h6">{product.title}</Typography>
          <Typography>{product.description}</Typography>
          {/* <Typography>{product.type}</Typography> */}
        </Box>
      </TableCell>
      <TableCell align="right">${(product.price * productQuantity).toFixed(2)}</TableCell>
      {/* <TableCell align="right">{cartItem.productQuantity}</TableCell> */}
      <QuantityEditorComp quantity={productQuantity} setQuantity={setProductQuantity} />
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginRight: 3 }}
          disabled={cartItem.productQuantity === productQuantity}
          onClick={saveChanges}
        >
          save changes
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(deleteCartItem({ cartItemId: cartItem.id }))}
        >
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItemComp;
