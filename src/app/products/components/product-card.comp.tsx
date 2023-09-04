import React, { FC } from 'react';
import { ProductDto } from '../types/product-dto.type';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

interface ProductCardCompProps {
  product: ProductDto;
}

const ProductCardComp: FC<ProductCardCompProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Box width={220} onClick={() => navigate(`${product.category}/${product.id}`)}>
      <Card sx={{ width: 220 }} elevation={4}>
        <CardActionArea>
          <Box margin={'0 auto'} width={80} height={220} display="flex" alignItems="center">
            <CardMedia component="img" image={product.image} alt={product.title}></CardMedia>
          </Box>

          <CardContent sx={{ paddingTop: 0, paddingBottom: 0, backgroundColor: 'primary.light' }}>
            <Typography gutterBottom variant="body1" color="white">
              {product.title}
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="gold">
                ${product.price}
              </Typography>
              <Typography variant="body2" color="white">
                {product.type}
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
    </Box>
  );
};

export default ProductCardComp;
