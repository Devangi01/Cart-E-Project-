import PropTypes from 'prop-types';

import { useContext,useEffect,useState } from 'react';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import Slider from '@mui/material/Slider';
// components
import { MainContext } from '../../../context/MainContext'; // Adjust the file path accordingly

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' },
];
export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Shoes', 'Clothes', 'Jewellery'];
export const FILTER_RATING_OPTIONS = ['4', '3', '2', '1'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  
  const minDistance = 1000;
  const [value2, setValue2] = useState([1000,2000]);

  const { mainState, setMainState } = useContext(MainContext);

 
  const handleChange2 = (event,newValue,activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 20000 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  useEffect(()=>{
    const updateObject = mainState.filterState;
    updateObject.price = value2;
    setMainState({ ...mainState,updateObject});
  },[value2])

  
  function jumpToProcessFilterFunction(){
    console.log("calll");
    const finalFilterData =  filterRecord(mainState.storeOriginalProductData,mainState.filterState);
    setMainState({...mainState,productData:finalFilterData})
     console.log("Final Filter Result", finalFilterData);
  }


  function filterRecord(inputArray,filterObject){
    console.log(inputArray,filterObject)
   const filterData =  inputArray.filter((eachObject)=> eachObject.category.toLowerCase() === filterObject.category.toLowerCase());
    return filterData;
  }



  const handleChange = (event, name) => {
  name = name.toLowerCase();
    const getFilterObject = mainState.filterState;
    if(name==="gender" && event.target.checked){
      getFilterObject[name]=[...getFilterObject[name],event.target.value];
    }else if(name==="gender" && event.target.checked === false){
      const d = getFilterObject[name].filter((data) => data !== name);
      getFilterObject[name] = getFilterObject[name].filter((data) => data !== event.target.value);
    } 
    else{
      getFilterObject[name]=event.target.value;
    }
    setMainState({ ...mainState, getFilterObject });
    jumpToProcessFilterFunction();
  };
  
  function filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        // ignores non-function predicates
        if (typeof filters[key] !== 'function') return true;
        return filters[key](item[key]);
      });
    });
  }
  
  
  const filterData = filterArray(mainState.productData,mainState.filterState)
  console.log("->>>>>>>>>>>>>>>>",filterData);
  console.log("After",mainState.filterState);
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Gender
              </Typography>
              <FormGroup>
                {FILTER_GENDER_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    control={<Checkbox value={item} onChange={(event) => handleChange(event, 'Gender')} />}
                    label={item}
                  />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<Radio value={item} onChange={(event) => handleChange(event, 'Category')} />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Price
              </Typography>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="auto"
               // getAriaValueText={valuetext}
               max={20000}
               min={1000}
                disableSwap
               />
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Rating
              </Typography>
              <Rating
                name="half-rating"
                value={mainState.filterState.rating}
                precision={0.5}
                size="large"
                onChange={(event) => handleChange(event, 'Rating')}
              />
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
