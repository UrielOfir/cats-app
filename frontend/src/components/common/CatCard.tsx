import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { LocationOn, Cake, FavoriteBorder, Favorite } from '@mui/icons-material';
import { Cat } from '../../types';
import { calculateAge } from '../../utils/utils';

//TODO: when clicked liked button render only the button with the new number of likes

type CatCardProps = {
  cat: Cat;
  onLike?: () => Promise<void>;
  isLiked?: boolean;
};

const CatCard: React.FC<CatCardProps> = ({ cat, onLike, isLiked }) => {
  return (
    <Card sx={{ m: 2, maxWidth: '30vw' }}>
      <CardMedia component="img" image={cat.image} alt={cat.name} sx={{ maxHeight: '30vw', maxWidth: '30vw' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cat.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOn fontSize="small" /> {cat.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Cake fontSize="small" /> Born: {cat.birth}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          age: {calculateAge(cat.birth)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Favorite food: {cat.food}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Height: {cat.height} cm, Weight: {cat.weight} kg
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onLike} size="small" color="primary">
          {isLiked ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
          Like ({cat.likes})
        </Button>
      </CardActions>
    </Card>
  );
};

export default CatCard;
