import {
  useState,
  useEffect,
  useContext,
  createContext
} from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';

const PreloadContext = createContext<boolean>(false);

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  /** If the dom is loaded */
  const [preloaded, setIsPreloaded] = useState<boolean>(false);
  const dynamicRoute = useRouter().asPath

  useEffect(() => {
    const handler =  setTimeout(() => {
      setIsPreloaded(true);
    }, 500);

    return () => {
      clearTimeout(handler);
    }
  }, [dynamicRoute]);

  return (
    <PreloadContext.Provider value={preloaded}>
      <div
        className={clsx(
          'fixed inset-0 flex items-center justify-center bg-white transition-opacity dark:bg-dark',
          preloaded && 'pointer-events-none opacity-0'
        )}
      />
      {children}
    </PreloadContext.Provider>
  );
}

export const usePreloadState = () => useContext(PreloadContext);
