
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
 // Adjust the file path accordingly


// @mui
import { Container, Stack, Typography } from '@mui/material';
import { MainContext } from '../context/MainContext';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';


// ----------------------------------------------------------------------


export default function ProductsPage() {

const {mainState, setMainState} = useContext(MainContext)

  const encodedToken = localStorage.getItem("token");
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  
  useEffect(()=> {
    const fecthProduct = async () => {
      try {
        const response = await axios.get(`/api/products`, {
          headers: {
            authorization: encodedToken, // passing token as an authorization header
          },

        });

        setMainState({...mainState,productData:response.data.products,storeOriginalProductData:response.data.products})
        
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

        <ProductList products={mainState.productData} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
