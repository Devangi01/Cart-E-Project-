import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// Adjust the file path accordingly

// @mui
import { Container, Stack, Typography,Box } from '@mui/material';
import Divider from '@mui/material/Divider';

import { MainContext } from '../context/MainContext';
// components
// import ProductWishlist from 'src/sections/@dashboard/products/ProductWishlist';
import ProductWishlist from '../sections/@dashboard/products/ProductWishlist';
import ProductCartlist from '../sections/@dashboard/products/ProductCartlist';

// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Cartlist() {
  const { mainState, setMainState } = useContext(MainContext);

  console.log('BLog', mainState.cartlist);
  return (
    <>
      <Helmet>
        <title> Dashboard: Cart | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Cart Management
        </Typography>
        <Stack direction="row">
        {mainState.cartlist.length > 0 ? (
          <ProductCartlist products={mainState.cartlist} />
        ) : (
          <Typography align="center" variant="h6" sx={{ mb: 5 }}>
            No more item in Cart page
          </Typography>
        )}
        <Box sx={{
  width: 400,
  height: 300,
  backgroundColor: "gray",
  borderRadius: 4,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflowY: 'scroll' // Add this to enable scrolling if the content exceeds the container height
}}>
  <Typography variant="h6" align="center">
    Price Details
  </Typography>
  <Divider />
  <Stack spacing={1} sx={{ mt: 2 }}>
    {/* Cart Items */}
    {/* {mainState.cartlist.map((product) => (
      <Stack key={product.id} direction="row" justifyContent="space-between">
        <Typography variant="body2">{product.title}</Typography>
        <Typography variant="body2">{product.price}</Typography>
      </Stack>
    ))}
    <Divider /> */}
    {/* Subtotal */}
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2">Subtotal:</Typography>
      <Typography variant="body2">$100.00</Typography>
    </Stack>
    {/* Shipping */}
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2">Price:</Typography>
      <Typography variant="body2">$10.00</Typography>
    </Stack>
    {/* Discount */}
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="body2">Quantity:</Typography>
      <Typography variant="body2">-$20.00</Typography>
    </Stack>
    <Divider />
    {/* Total */}
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="subtitle1">Final total:</Typography>
      <Typography variant="subtitle1">$90.00</Typography>
    </Stack>
  </Stack>
</Box>




        </Stack>
      </Container>
    </>
  );
}
