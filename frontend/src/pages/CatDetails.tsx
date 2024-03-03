import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Cat } from '../types';
import CatCard from '../components/common/CatCard.tsx';
import { useLikeCatMutation } from '../redux/api/cats.ts';

const CatDetails: React.FC = () => {
  const location = useLocation();
  const cat: Cat = location.state?.cat || {
    id: 0,
    name: '',
    birth: '',
    location: '',
    image: '',
    food: '',
    height: 0,
    weight: 0,
    likes: 0,
  };

  const [displayCat, setDisplayCat] = useState<Cat>(cat);

  const [likeCat, { isLoading, isError, isSuccess, data }] = useLikeCatMutation();

  const handleLike = async () => {
      const response = await likeCat({ id: cat.id });

      if ('error' in response && response.error) {
        console.error('Error liking cat:', response.error);
      }

  };

  useEffect(() => {
    if (isSuccess && data) {
      setDisplayCat(data.cat);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location.state?.cat]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log('Error: failed to like cat');
  }

  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CatCard cat={displayCat} onLike={handleLike} />
    </Grid>
  );
};

export default CatDetails;
