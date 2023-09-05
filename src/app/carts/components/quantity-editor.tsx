import { Box, IconButton, TableCell } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { FC } from 'react';

interface QunatityEditorCompPros {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<any>>;
}

const QuantityEditorComp: FC<QunatityEditorCompPros> = ({ quantity, setQuantity }) => {
  return (
    <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => setQuantity(quantity - 1)} disabled={quantity < 2}>
          <ArrowBackIosNewIcon />
        </IconButton>
        {quantity}
        <IconButton onClick={() => setQuantity(quantity + 1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </TableCell>
  );
};

export default QuantityEditorComp;
