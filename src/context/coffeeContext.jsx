import React, { createContext, useState, useEffect } from "react";

export const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
  const [coffeeData, setCoffeeData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api");
        const data = await response.json();
        setCoffeeData(data);
      } catch (error) {
        console.error("Error fetching coffee data:", error);
      } 
    };

    fetchData();
  }, []);

  return (
    <CoffeeContext.Provider value={{ coffeeData }}>
      {children}
    </CoffeeContext.Provider>
  );
};