import React, { useState, lazy, Suspense } from 'react';

import {  Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
      <AdoptedPetContext.Provider value={adoptedPet}>
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <div className="loading-pane">
                <h2 className='loader'>🌀</h2>
              </div>
            }
          >
            <header>
              <Link to="/">Adopt Me!</Link>
            </header>
            <h1>Adopt Me!</h1>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </Suspense>
        </QueryClientProvider>
      </AdoptedPetContext.Provider>
  );
};
export default App;