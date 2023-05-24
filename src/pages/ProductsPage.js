import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------



export default function ProductsPage() {

  const encodedToken = localStorage.getItem("token");
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [productData,setProductData] = useState([])

  useEffect(()=> {
    const fecthProduct = async () => {
      try {
        const response = await axios.get(`/api/products`, {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },

        });
        setProductData(response.data.products)
  console.log(response.data.products)
      } catch (error) {
        console.log(error);
      }

    }
    fecthProduct();
  },[])
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container> 
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={productData} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
