import { Grid, Typography } from '@mui/material';
import { useFindTop5Query } from '../redux/api/cats';
import { Cat } from '../types';
import CatCard from '../components/common/CatCard';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/common/SearchTerm';

//TODO: new card for favorite cats

const Home: React.FC = () => {
  const navigate = useNavigate();

  // Add a click handler to the CatCard component
  const handleCatCardClick = (cat: Cat) => {
    navigate(`/cats/${cat.id}`, { state: { cat } });
  };

  const handleSearchChange = (newSearchTerm: string) => {
    navigate(`/search`, { state: { searchTerm: newSearchTerm } });
  };

  const { data: cats, error, isLoading } = useFindTop5Query();

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
        <SearchInput emitNewTerm={handleSearchChange} />
      </Grid>

      <Grid item container xs={12} justifyContent="center" alignItems="center">
        <Typography variant="h1" gutterBottom sx={{ color: 'blue', textAlign: 'center' }}>
          5 most popular cats
        </Typography>
      </Grid>
      <Grid item container xs={12} justifyContent="center">
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

export default Home;
