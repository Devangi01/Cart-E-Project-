import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Box, Card, Link, Typography, Stack, Radio, FormControlLabel, Rating } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { styled } from '@mui/material/styles';
import { fCurrency } from '../../../utils/formatNumber';
import { MainContext } from '../../../context/MainContext';
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

ShopProductCardWishlist.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCardWishlist({ product }) {
  const { title, price, category, img, rating, _id } = product;
  const { mainState, setMainState } = useContext(MainContext);

 
  const handleIconClick = () => {
    const updatedWishlist = mainState.wishlist.filter((data) => data.id !== product.id);
    setMainState({ ...mainState, wishlist: updatedWishlist });
    console.log("dddddd",updatedWishlist)
  };


 
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
    <Link color="inherit" underline="hover" href={`singleProduct/${_id}`}>
      <Typography variant="subtitle2" style={{ cursor: 'pointer' }} noWrap>
        {title}
      </Typography>
    </Link>

    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="subtitle1">{fCurrency(price)}</Typography>

      <Typography>
        <Stack direction="row" spacing={2}>
          <DeleteForeverIcon onClick={handleIconClick} style={{ cursor: 'pointer', color: '#ed3939' }} />
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
            icon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
            checkedIcon={<Rating name="half-rating" precision={0.5} readOnly value={rating} />}
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