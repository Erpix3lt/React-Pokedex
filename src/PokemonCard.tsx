import React from 'react';
import { Ability } from './interfaces/Pokemon';
import Card from '@mui/material/Card';
import { CardContent, CardMedia, Chip, Typography } from '@mui/material';

interface PokemonCardProps {
  name: string;
  image_url: string;
  abilities: Ability[];
  type: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image_url, abilities, type }) => {
  return (

    <Card>
      <CardMedia sx={{ height: 200 }}
        image={image_url}
        title={name} />
      <CardContent>
        <div className='flex flex-row items-center justify-between gap-2'>
          <Typography sx={{margin: 0}} gutterBottom variant="h5" component="div">
            {name.toUpperCase()}
          </Typography>
          <Chip label={type.toUpperCase()} />
        </div>

        <div className='flex flex-col items-start mt-2'>
          {abilities.map((ability, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-1">Ability {index + 1}: </span>
              <span>{ability.ability.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
