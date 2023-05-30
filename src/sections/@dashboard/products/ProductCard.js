import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, Card, Link, Typography, Stack, Radio, FormControlLabel, Rating } from '@mui/material';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';



// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------
  
ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { title , price, category, img, rating ,_id} = product;
 
  const [mainProductCardState, setMainProductCardState] = useState({
        wishlistIconFlag:true,
        addToCartIconFlag:true
  });

const handleIconClick = (id,iconName)=>{
  setMainProductCardState({...mainProductCardState,[iconName]:!mainProductCardState[iconName]})
  console.log(id+iconName);
}

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
      {category && (
          <Label
            variant="filled"
            color={(category === 'shoes' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </Label>
        )}
        <StyledProductImg alt={title} src={img} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" style={{cursor:"pointer"}}  noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
      
          <Typography variant="subtitle1">
            {fCurrency(price)}
          </Typography>


          <Typography >

          <Stack direction="row" spacing={2}>
         {mainProductCardState.wishlistIconFlag ?  <FavoriteBorderIcon  onClick={() => handleIconClick(_id,"wishlistIconFlag") } style={{cursor:"pointer"}}/> :  <FavoriteIcon  onClick={() => handleIconClick(_id,"wishlistIconFlag")} style={{cursor:"pointer",color:"#ed3939"}}/>}
         {mainProductCardState.addToCartIconFlag ?  <AddShoppingCartOutlinedIcon onClick={() => handleIconClick(_id,"addToCartIconFlag")} style={{cursor:"pointer"}}/> :  <ShoppingCartCheckoutIcon onClick={() => handleIconClick(_id,"addToCartIconFlag")} style={{cursor:"pointer",color:"darkblue"}}/>}
         
          </Stack>           
          </Typography>
        </Stack>
        <Stack>
        <FormControlLabel
                    key={rating}
                    value={rating}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={rating} />}
                        checkedIcon={<Rating readOnly value={rating} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
        </Stack>
      </Stack>
    </Card>
  );
}
