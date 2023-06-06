import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
// Adjust the file path accordingly

// @mui
import { Container, Stack, Typography, Box, Grid, Table, TextField } from '@mui/material';
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

// ----------------------------------------------------------------------

export default function Cartlist() {
  const { mainState, setMainState } = useContext(MainContext);
  const [totalSum, setTotalSum] = useState(100);
  console.log('BLog', mainState.cartlist);
  useEffect(() => {
    // Calculate total sum
    const sum = mainState.cartlist.reduce(
      (total, row) => total + Number(row.price) * Number(row.quantity),
      0
    );
    setTotalSum(sum);
  }, [mainState.cartlist]);
  
  return (
    <>
      <Helmet>
        <title> Dashboard: Cart | Minimal UI </title>
      </Helmet>

      <Container>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Typography variant="h4" sx={{ mb: 3 }}>
                Cart Management
              </Typography>
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                height: 310,
                overflow: "hidden",
                overflowY: "auto",
                overflowX: "auto",
              }}>
                <Stack direction="row">
                  {mainState.cartlist.length > 0 ? (
                    <ProductCartlist products={mainState.cartlist} />
                  ) : (
                    <Typography align="center" variant="h6" sx={{ mb: 5 }}>
                      No more item in Cart page
                    </Typography>
                  )}

                </Stack>
              </Box>

            </Grid>
            {
              mainState.cartlist.length > 0 && <Grid item xs={5}>
                <Box sx={{
                  width: 400,
                  height: 340,

                  borderRadius: 4,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  p: 2,
                }}>
                  <Typography variant="h6" align="center">
                    Price Details
                  </Typography>

                  <Box sx={{
                    width: 370,
                    height: 200,
                    borderRadius: 2,
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  }} >
                    <TableContainer style={{ maxHeight: 200, overflowY: "auto" }} component={Paper}>
                      <Table stickyHeader size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Total</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {mainState.cartlist.map((row) => (
                            <TableRow
                              key={row._id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {row.title}
                              </TableCell>
                              <TableCell align="center">{row.price}</TableCell>
                              <TableCell align="center">{row.quantity}</TableCell>
                              <TableCell align="center">{Number(row.price) * Number(row.quantity)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Grid container style={{ padding: "5px" }} spacing={2}>
                    <Grid item xs={5} />
                    <Grid item xs={7} >
                      <Grid container >
                        <Grid item xs={5} >
                          < Typography sx={{ mt: .4, mr: .2 }}>
                            Sub Total
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>

                          <TextField id="outlined-basic" disabled inputProps={{
                            style: {
                              height: "2px",
                              width: "90px",
                              margin: "-3px"
                            },
                          }} value={totalSum} />
                        </Grid>
                        <Grid item xs={5}>
                          < Typography sx={{ mt: .4, mr: .2 }}>
                            Tax
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>

                          <TextField id="outlined-basic" disabled inputProps={{
                            style: {
                              height: "2px",
                              width: "90px",
                              margin: "-3px"
                            },
                          }} value="2222" />
                        </Grid> <Grid item xs={5}>

                          < Typography sx={{ mt: .4, mr: .2 }}>
                            Total
                          </Typography>
                        </Grid>
                        <Grid item xs={7}>

                          <TextField id="outlined-basic" disabled inputProps={{
                            style: {
                              height: "2px",
                              width: "90px",
                              margin: "-3px"
                            },
                          }} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            }
          </Grid>
        </Box>
      </Container>
    </>
  );
}
