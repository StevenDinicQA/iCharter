"use client";
import React, { createContext, useContext, useState } from 'react';
import { IDataContext, DataProviderProps } from './types';


export const DataContext = createContext<IDataContext | null>(null);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [listingData, setListingData] = useState<IDataContext['listingData'] | null>(null);

  const value: IDataContext = {
    listingData,
    setListingData,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): IDataContext => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};