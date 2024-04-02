import { useState, useEffect } from 'react'
import './App.css'
import { Pokemon } from './interfaces/Pokemon';
import PokemonCard from './PokemonCard';
import { Grid, Skeleton } from '@mui/material';
import TypeSelect from './TypeSelect';

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>();
  const [pokemonToBeSearched, setPokemonToBeSearched] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleSelect = (value: string) => {
    setSelectedType(value);
  };

  useEffect(() => {
    getPokemons().then(newPokemons => setPokemons(newPokemons))
  }, [])

  async function getPokemonList() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
    if (!response.ok) {
      alert(`Could not find pokemon`)
      throw new Error('Failed to fetch data from the Pokemon API');
    }
    const data = await response.json();
    return data.results;
  }

  async function getPokemons() {
    const pokemonList = await getPokemonList()
    const pokemonDataArray: Pokemon[] = [];
    for (const pokemon of pokemonList) {
      const response = await fetch(pokemon.url);
      if (!response.ok) {
        console.error(`Failed to fetch data for ${pokemon.name}`);
        continue;
      }
      const pokemonData = await response.json();
      pokemonDataArray.push(pokemonData);
    }
    return pokemonDataArray;
  }

  return (
    <>
      <div className="card">
        <div className='flex flex-row items-center justify-between mb-8'>
          <input className='bg-slate-100 border border-slate-200 h-10 rounded-md p-2'
            onChange={(e) => setPokemonToBeSearched(e.target.value)}
            placeholder="Enter Pokemon Name">
          </input>
          <TypeSelect onSelect={handleSelect} type={selectedType} />
        </div>

        {pokemons ? (
          <Grid container spacing={3} justifyContent="flex-start">
            {pokemons.filter(pokemon => {
              if (selectedType === 'all') {
                if (pokemonToBeSearched === 'all') {
                  return true;
                } else {
                  return pokemon.name.toLowerCase().includes(pokemonToBeSearched.toLowerCase());
                }
              } else if (selectedType !== 'all' && pokemonToBeSearched === 'all') {
                return selectedType === pokemon.types[0].type.name;
              } else {
                return selectedType === pokemon.types[0].type.name && pokemon.name.toLowerCase().includes(pokemonToBeSearched.toLowerCase());
              }
            }).map((pokemon, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <PokemonCard name={pokemon.name} image_url={pokemon.sprites.front_default} abilities={pokemon.abilities} type={pokemon.types[0].type.name} />
              </Grid>
            ))}
          </Grid>
        ) :
          <Grid container spacing={3} justifyContent="flex-end">
            {[...Array(12)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Skeleton variant="rounded" width={280} height={340} />
              </Grid>
            ))}
          </Grid>
        }
      </div >
    </>
  )
}

export default App
