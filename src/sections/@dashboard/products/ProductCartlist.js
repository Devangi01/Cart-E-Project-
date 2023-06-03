import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCardCartlist from './ShopProductCardCartlist';


// ----------------------------------------------------------------------

ProductCartlist.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductCartlist({ products, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCardCartlist product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

