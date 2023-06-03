import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// Adjust the file path accordingly

// @mui
import { Container, Stack, Typography } from '@mui/material';
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
        {mainState.cartlist.length > 0 ? (
          <ProductCartlist products={mainState.cartlist} />
        ) : (
          <Typography align="center" variant="h6" sx={{ mb: 5 }}>
            No more item in Cart page
          </Typography>
        )}
      </Container>
    </>
  );
}
