import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const PokemonCard = ({ name, url }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(url);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [url]);

  let altura = null
  let peso = null
  let alturaFormatado = null
  let pokemonType = null

  //variaveis dos status
  let hp = null
  let attack = null
  let defense = null
  let specialAttack = null
  let specialDefense = null
  let speed = null
  //fim das variaveis dos status

  if(pokemonDetails){
    altura = pokemonDetails.height / 10;
    peso = pokemonDetails.weight / 10;

    if(altura){
      let alturaString = altura.toString();
      if(alturaString.startsWith("0")){
        alturaFormatado = alturaString.substring(2) + "0 cm"
      } else {
        alturaFormatado = altura + " M"
      };
    };

    if(pokemonDetails.types.length === 1){
      pokemonType = pokemonDetails.types[0].type.name.charAt(0).toUpperCase() + pokemonDetails.types[0].type.name.slice(1)
      switch(pokemonType){
        case "Grass" : pokemonType = "Grama";break;
        case "Poison" : pokemonType = "Veneno";break;
        case "Bug" : pokemonType = "Inseto";break;
        case "Dragon" : pokemonType = "Dragão";break;
        case "Electric" : pokemonType = "Elétrico";break;
        case "Fairy" : pokemonType = "Fada";break;
        case "Fighting" : pokemonType = "Lutador";break;
        case "Fire" : pokemonType = "Fogo";break;
        case "Flying" : pokemonType = "Voador";break;
        case "Ghost" : pokemonType = "Fantasma";break;
        case "Ground" : pokemonType = "Terreno";break;
        case "Ice" : pokemonType = "Gelo";break;
        case "Normal" : pokemonType = "Normal";break;
        case "Psychic" : pokemonType = "Psíquico";break;
        case "Rock" : pokemonType = "Pedra";break;
        case "Steel" : pokemonType = "Aço";break;
        case "Water" : pokemonType = "Água";break;
        case "Dark" : pokemonType = "Escuro";break;
        default: pokemonType = "Unknown";break;
          };
    } 
    if(pokemonDetails.types.length === 2) {
    let type1 = pokemonDetails.types[0].type.name.charAt(0).toUpperCase() + pokemonDetails.types[0].type.name.slice(1)
    let type2 = pokemonDetails.types[1].type.name.charAt(0).toUpperCase() + pokemonDetails.types[1].type.name.slice(1)

    switch(type1){
      case "Grass" : type1 = "Grama";break;
      case "Poison" : type1 = "Veneno";break;
      case "Bug" : type1 = "Inseto";break;
      case "Dragon" : type1 = "Dragão";break;
      case "Electric" : type1 = "Elétrico";break;
      case "Fairy" : type1 = "Fada";break;
      case "Fighting" : type1 = "Lutador";break;
      case "Fire" : type1 = "Fogo";break;
      case "Flying" : type1 = "Voador";break;
      case "Ghost" : type1 = "Fantasma";break;
      case "Ground" : type1 = "Terreno";break;
      case "Ice" : type1 = "Gelo";break;
      case "Normal" : type1 = "Normal";break;
      case "Psychic" : type1 = "Psíquico";break;
      case "Rock" : type1 = "Pedra";break;
      case "Steel" : type1 = "Aço";break;
      case "Water" : type1 = "Água";break;
      case "Dark" : type1 = "Escuro";break;
      default: type1 = "Unknown";break;
        };
      switch(type2){
        case "Grass" : type2 = "Grama";break;
        case "Poison" : type2 = "Veneno";break;
        case "Bug" : type2 = "Inseto";break;
        case "Dragon" : type2 = "Dragão";break;
        case "Electric" : type2 = "Elétrico";break;
        case "Fairy" : type2 = "Fada";break;
        case "Fighting" : type2 = "Lutador";break;
        case "Fire" : type2 = "Fogo";break;
        case "Flying" : type2 = "Voador";break;
        case "Ghost" : type2 = "Fantasma";break;
        case "Ground" : type2 = "Terreno";break;
        case "Ice" : type2 = "Gelo";break;
        case "Normal" : type2 = "Normal";break;
        case "Psychic" : type2 = "Psíquico";break;
        case "Rock" : type2 = "Pedra";break;
        case "Steel" : type2 = "Aço";break;
        case "Water" : type2 = "Água";break;
        case "Dark" : type2 = "Escuro";break;
        default: type2 = "Unknown";break;
        };
 
      pokemonType = type1 + "/" + type2
    };
    //Trazendo as informações dos status dos pokemons
    hp = pokemonDetails.stats[0].base_stat
    attack = pokemonDetails.stats[1].base_stat
    defense = pokemonDetails.stats[2].base_stat
    specialAttack = pokemonDetails.stats[3].base_stat
    specialDefense = pokemonDetails.stats[4].base_stat
    speed = pokemonDetails.stats[5].base_stat
  };

  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`pokemon-card ${expanded ? 'expanded' : ''}`} onClick={handleCardClick}>
      <h3>{name}</h3>
      {pokemonDetails && expanded && (
        <>
          <img
            src={pokemonDetails.sprites.front_default}
            alt={`${name} sprite`}
          />
          <p className="tipoPokemon">{pokemonType}</p>
          <p className="status">Hp: {hp}</p>
          <p className="status">Ataque: {attack}</p>
          <p className="status">Defesa: {defense}</p>
          <p className="status">Ataque Especial: {specialAttack}</p>
          <p className="status">Defesa Especial: {specialDefense}</p>
          <p className="status">Velocidade: {speed}</p>
          <p className="status">Altura: {alturaFormatado}</p>
          <p className="status">Peso: {peso} kg</p>
        </>
      )}
    </div>
  );
};

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    //Filtrar com base no pokemon pesquisado
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPokemonList(filteredList);
  }, [searchInput, pokemonList]);

  return (
    <div className="pokedex">
      <h1>Pokédex</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="pokemon-list">
        {filteredPokemonList.map((pokemon, index) => (
          <PokemonCard 
          key={index} 
          name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

export default Pokedex;