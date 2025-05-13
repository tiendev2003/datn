"use client";

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};