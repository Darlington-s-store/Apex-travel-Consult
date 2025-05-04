import { createContext, useState, useContext, useEffect, ReactNode, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  setLoading: () => {}
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProviderComponent = ({ children }: LoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  
  // Track first load to show longer loading on initial page visit
  const isFirstLoad = useRef(true);

  // Function to start loading
  const startLoading = () => {
    setIsLoading(true);
  };

  // Function to stop loading
  const stopLoading = () => {
    // Small delay before setting isLoading to false for smoother transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  
  // Function to directly set loading state
  const setLoading = (state: boolean) => {
    if (state) {
      startLoading();
    } else {
      stopLoading();
    }
  };

  // Handle route changes
  useEffect(() => {
    startLoading();
    
    // Set loading duration based on route
    const loadingDuration = () => {
      // First load should be longer to show the full loading experience
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return 10000; // 10 seconds for initial load
      }
      
      // Blog detailed page should load faster
      if (location.pathname.startsWith('/blog/')) {
        return 8000; // 8 seconds for blog posts
      }
      // Admin pages should load faster
      if (location.pathname.startsWith('/admin/')) {
        return 6000; // 6 seconds for admin pages
      }
      // Other pages
      return 8000; // 8 seconds for other pages
    };

    const timer = setTimeout(() => {
      stopLoading();
    }, loadingDuration());
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

LoadingProviderComponent.displayName = 'LoadingProvider';
export const LoadingProvider = LoadingProviderComponent;