import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useSearchByNameQuery } from '../redux/api/cats';
import { Cat } from '../types';
import CatCard from '../components/common/CatCard';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchInput from '../components/common/SearchTerm';

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  useEffect(() => {
    if (location.state && location.state.searchTerm) {
      setSearchTerm(location.state.searchTerm);
    }
  }, [location.state]);

  const handleCatCardClick = (cat: Cat) => {
    navigate(`/cats/${cat.id}`, { state: { cat } });
  };

  const handleSearchChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  // Conditionally execute the search query based on isSearchEnabled flag
  const {
    data: cats,
    error,
    isLoading,
  } = useSearchByNameQuery(searchTerm);

  if (isLoading) return <div>Loading...</div>;
  if (error && 'status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    return (
      <div>
        <div>An error has occurred:</div>
        <div>{errMsg}</div>
      </div>
    );
  }

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item container xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <SearchInput emitNewTerm={handleSearchChange} initialSearchTerm={searchTerm} />
      </Grid>
      <Grid item container xs={10} justifyContent={'center'}>
        {cats?.map((cat: Cat) => {
          return (
            <Grid item key={cat.id} onClick={() => handleCatCardClick(cat)} sx={{ cursor: 'pointer' }}>
              <CatCard cat={cat} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default Search;
