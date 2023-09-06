import { Box, IconButton, TableCell } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { FC } from 'react';

interface QunatityEditorCompPros {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<any>>;
}

const QuantityEditorComp: FC<QunatityEditorCompPros> = ({ quantity, setQuantity }) => {
  const editQuantity = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quantity: number,
  ) => {
    event.stopPropagation();
    setQuantity(quantity);
  };

  return (
    <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={(event) => editQuantity(event, quantity - 1)} disabled={quantity < 2}>
          <ArrowBackIosNewIcon />
        </IconButton>
        {quantity}
        <IconButton onClick={(event) => editQuantity(event, quantity + 1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </TableCell>
  );
};

export default QuantityEditorComp;
