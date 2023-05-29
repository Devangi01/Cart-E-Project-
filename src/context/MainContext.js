import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
   
  const [mainState, setMainState] = useState({
        filterState:{
            gender:[],
            category:"",
            price:"",
            rating:""
        },
        productData:[

        ]
  });

  return <MainContext.Provider value = {{mainState, setMainState}}>{children}</MainContext.Provider>;
};
