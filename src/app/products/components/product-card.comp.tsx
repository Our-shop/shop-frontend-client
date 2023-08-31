import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { IProductCard } from '../types/i-product-card.type';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Stack from '@mui/material/Stack';

interface ProductCardCompProps {
  card: IProductCard;
}

const ProductCardComp: FC<ProductCardCompProps> = ({ card }) => {
  useTheme();
  return (
    <Card sx={{ width: 160 }} elevation={4}>
      <CardActionArea>
        <Box paddingTop={2} paddingBottom={2} paddingLeft={5} paddingRight={5}>
          <CardMedia component="img" image={card.image} alt={card.title}></CardMedia>
        </Box>

        <CardContent sx={{ paddingTop: 0, paddingBottom: 0, backgroundColor: 'primary.light' }}>
          <Typography variant="h6" display={'flex'} justifyContent={'center'} color="white">
            {card.title}
          </Typography>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="gold">
              ${card.price}
            </Typography>
            <Typography variant="body2" color="white">
              {card.type}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ padding: 0, backgroundColor: 'primary.light' }}>
        <Button size="small" color="inherit" fullWidth>
          + Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCardComp;
