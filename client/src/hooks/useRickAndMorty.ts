import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Character, CharacterResponse, Episode, LocationResult } from '../types/characterTypes';


const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await axios.get<CharacterResponse>(
      'https://rickandmortyapi.com/api/character/',
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};


const fetchEpisodes = async (episodeUrls: string[]): Promise<Episode[]> => {
  try {
    const uniqueUrls = [...new Set(episodeUrls)]; 
    const episodePromises = uniqueUrls.map((url) => axios.get<Episode>(url));
    const responses = await Promise.all(episodePromises);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};


const fetchLocations = async (locationUrls: string[]): Promise<LocationResult[]> => {
  try {
    const uniqueUrls = [...new Set(locationUrls)]; 
    const locationPromises = uniqueUrls.map((url) => axios.get<LocationResult>(url));
    const responses = await Promise.all(locationPromises);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

export default function useData() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [locations, setLocations] = useState<LocationResult[]>([]);

  const getData = async (): Promise<void> => {
    try {
      const charactersData = await fetchCharacters();
      const episodeUrls = charactersData.flatMap((character) => character.episode);
      const locationUrls = charactersData.flatMap((character) => [
        character.origin.url,
        character.location.url,
      ]);

      const [episodesData, locationsData] = await Promise.all([
        fetchEpisodes(episodeUrls),
        fetchLocations(locationUrls),
      ]);

      const episodesMap = new Map(episodesData.map((episode) => [episode.url, episode]));
      const locationsMap = new Map(locationsData.map((location) => [location.url, location]));

      const charactersWithDetails = charactersData.map((character) => ({
        ...character,
        episode: character.episode
          .map((url) => episodesMap.get(url)?.name || url)
          .filter(Boolean) as string[],
        origin: locationsMap.get(character.origin.url) || character.origin,
        location: locationsMap.get(character.location.url) || character.location,
      }));

      setCharacters(charactersWithDetails);
      setEpisodes(episodesData);
      setLocations(locationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteHandler = (id: number): void => {
    setCharacters((prev) => prev.filter((character) => character.id !== id));
  };

  useEffect(() => {
    void getData();
  }, []);

  return {
    characters,
    episodes,
    locations,
    deleteHandler,
  };
}
