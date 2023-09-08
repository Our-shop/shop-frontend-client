import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { CartItemDto } from '../types/cart-item.dto';
import QuantityEditorComp from './quantity-editor';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { editProductQuantity, deleteCartItem } from '../store/carts.actions';
import { useNavigate } from 'react-router-dom';

interface CartItemCompProps {
  cartItem: CartItemDto;
}

const CartItemComp: FC<CartItemCompProps> = ({ cartItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const product = cartItem.product;

  const [productQuantity, setProductQuantity] = useState(cartItem.productQuantity);

  // BUTTONS
  const saveChanges = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(editProductQuantity({ ...cartItem, productQuantity }));
  };

  const deleteItem = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    dispatch(deleteCartItem({ cartItemId: cartItem.id }));
  };

  return (
    <TableRow hover onClick={() => navigate(`/products/${product.category}/${product.id}`)}>
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

      <QuantityEditorComp quantity={productQuantity} setQuantity={setProductQuantity} />

      <TableCell>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 3 }}
          disabled={cartItem.productQuantity === productQuantity}
          onClick={(event) => saveChanges(event)}
        >
          save changes
        </Button>
        <Button variant="contained" color="error" onClick={(event) => deleteItem(event)}>
          delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItemComp;
