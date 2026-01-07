import { createContext, useState, useContext, ReactNode, useCallback } from 'react';

interface RefreshContextType {
  refreshCount: number;
  triggerRefresh: () => void;
  isRefreshing: boolean;
  completeRefresh: () => void;
}

const RefreshContext = createContext<RefreshContextType | undefined>(undefined);

export const RefreshProvider = ({ children }: { children: ReactNode }) => {
  const [refreshCount, setRefreshCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const triggerRefresh = useCallback(() => {
    setIsRefreshing(true); // Start refreshing animation
    setRefreshCount(prev => prev + 1);
  }, []);

  const completeRefresh = useCallback(() => {
    setIsRefreshing(false); // End refreshing animation
  }, []);

  return (
    <RefreshContext.Provider value={{ refreshCount, triggerRefresh, isRefreshing, completeRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (context === undefined) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};
