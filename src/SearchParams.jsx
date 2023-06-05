import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Results from './Results';
import useBreedList from './useBreedList';
import fetchSearch from './fetchSearch';
const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  const handleAnimalOnChange = (e) => {
    setAnimal(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = {
      animal: formData.get('animal') ?? '',
      breed: formData.get('breed') ?? '',
      location: formData.get('location') ?? '',
    };
    setRequestParams(obj);
  };

  return (
    <div className="search-params">
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="location">Location</label>
        <input name="location" id="location" placeholder="location"></input>
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={handleAnimalOnChange}>
            <option />
            {ANIMALS.map((animal) => {
              return <option value={animal}>{animal}</option>;
            })}
          </select>
        </label>
        <label htmlFor="breed">
          breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds.map((breed) => {
              return <option value={breed}>{breed}</option>;
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
