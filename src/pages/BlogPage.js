
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
 // Adjust the file path accordingly


// @mui
import { Container, Stack, Typography } from '@mui/material';
import { MainContext } from '../context/MainContext';
// components
// import ProductWishlist from 'src/sections/@dashboard/products/ProductWishlist';
import  ProductWishlist  from '../sections/@dashboard/products/ProductWishlist';
// mock
import PRODUCTS from '../_mock/products';



// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
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
        <title> Dashboard: Blog | Minimal UI </title>
      </Helmet>

      <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
         Wishlist Management
        </Typography>

        <ProductWishlist products={mainState.productData} />
    
      </Container>
    </>
  );
}
