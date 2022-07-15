import React,{ createContext, useState } from 'react';

const ColorContext = createContext();



const ColorProvider = ({ children }: React.ReactNode) => {
  const [color, setColor] = useState([[223,234,252]]);

  return (
    <ColorContext.Provider
      value={{
        color,
        setColor,
      }}>
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext, ColorProvider };