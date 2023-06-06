import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// Adjust the file path accordingly

// @mui
import { Container, Stack, Typography,Box, Grid, Table } from '@mui/material';
import Divider from '@mui/material/Divider';


import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------
import { MainContext } from '../context/MainContext';
// components
// import ProductWishlist from 'src/sections/@dashboard/products/ProductWishlist';
import ProductWishlist from '../sections/@dashboard/products/ProductWishlist';
import ProductCartlist from '../sections/@dashboard/products/ProductCartlist';






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
}}>
  <Typography variant="h6" align="center">
    Price Details
  </Typography>
    {/* <Divider sx={{ borderBottomWidth: 5 }} /> */}
  <Stack spacing={1}>
    {/* Cart Items */}
    {/* {mainState.cartlist.map((product) => (
      <Stack key={product.id} direction="row" justifyContent="space-between">
        <Typography variant="body2">{product.title}</Typography>
        <Typography variant="body2">{product.price}</Typography>
      </Stack>
    ))}
    <Divider /> */}
      </Stack>
      <Box sx={{
  width: 370,
  height: 200,
  backgroundColor: "Green",
  borderRadius: 2,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  p: 2,
}} >
  <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
         <Typography variant="h6" align="center">
    Price Details
  </Typography> <Typography variant="h6" align="center">
    Price Details
  </Typography> <Typography variant="h6" align="center">
    Price Details
  </Typography>
      </Stack>
</Box>

      
</Box>




        </Stack>
      </Container>
    </>
  );
}
