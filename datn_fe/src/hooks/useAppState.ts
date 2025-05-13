"use client";

import { useEffect, useState } from 'react';

/**
 * Custom hook to manage the sidebar state in the application
 * @returns State and functions to change the state
 */
const useSidebarState = () => {
  // Initialize state with value from localStorage or default value
  const [state, setState] = useState({
    sidebarOpen: true
  });

  // Read state from localStorage when component mounts
  useEffect(() => {
    // Get sidebar state from localStorage
    const sidebarPreference = localStorage.getItem('fithub-sidebar');
    if (sidebarPreference) {
      const isSidebarOpen = sidebarPreference === 'true';
      setState(prevState => ({
        ...prevState,
        sidebarOpen: isSidebarOpen
      }));
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('fithub-sidebar', state.sidebarOpen.toString());
  }, [state.sidebarOpen]);

  // Functions to change state
  const toggleSidebar = () => {
    setState(prevState => ({
      ...prevState,
      sidebarOpen: !prevState.sidebarOpen
    }));
  };
  
  const setSidebarOpen = (open: boolean) => {
    setState(prevState => ({
      ...prevState,
      sidebarOpen: open
    }));
  };

  return [
    state,
    {
      toggleSidebar,
      setSidebarOpen
    }
  ] as const;
};

export default useSidebarState;