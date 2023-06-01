import axios from "axios";
import React, {useState,useEffect}from "react";
import {Card, Box, Typography} from "@mui/material"
import { useParams } from "react-router-dom";



const SingleProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();

    useEffect(()=> {
        const fecthProduct = async () => {
          try {
            const response = await axios.get(`/api/products/${id}`, {
    
            });
    
            setProduct(response.data.product);
            
    //   console.log(response.data)
          } catch (error) {
            console.log(error);
          }
    
        }
        fecthProduct();
      },[id])

    // const { title, price, category, img, rating } = product;
      console.log(product && product.title);
    return (
        <Card>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {/* Render product image */}
          </Box>
    
          <Box sx={{ p: 3 }}>
            {/* Render product title, price, etc. */}
            <Typography>{product && product.title}</Typography>
          </Box>
        </Card>
      );
    };



export default SingleProductPage;