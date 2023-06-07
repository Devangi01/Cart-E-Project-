  import React, { createContext, useState } from 'react';

  export const MainContext = createContext();

  export const MainProvider = ({ children }) => {
    const [mainState, setMainState] = useState({
      filterState: {
        category: [],
        price: '',
        rating: '',
      },
      productData: [],
      storeOriginalProductData: [],
      wishlist: [],
      cartlist: [],
      isLoggedIn: false,
      alertBox :{
        text:"",
        type:""
      },
      loginFalg: true,
    });

   
  console.log(mainState.wishlist)
    return <MainContext.Provider value={{ mainState, setMainState}}>{children}</MainContext.Provider>;
  };
