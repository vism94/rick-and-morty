import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Character, Episode, EpisodeResponse } from '../../types/episodeTypes';

const fetchEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await axios.get<EpisodeResponse>('https://rickandmortyapi.com/api/episode/');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
};

const fetchCharactersByEpisode = async (episodeUrls: string[]): Promise<Character[]> => {
  try {
    const uniqueUrls = [...new Set(episodeUrls)]; 
    const characterPromises = uniqueUrls.map((url) => axios.get<Character>(url));
    const responses = await Promise.all(characterPromises);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

function EpisodesPage(): JSX.Element {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const episodesData = await fetchEpisodes();
      setEpisodes(episodesData);

      
      const episodeCharacterUrls = episodesData.flatMap((episode) => episode.characters);
      const charactersData = await fetchCharactersByEpisode(episodeCharacterUrls);
      setCharacters(charactersData);
    };

    getEpisodes();
  }, []);

  const getCharactersForEpisode = (episodeId: number): Character[] => {
    const episode = episodes.find((ep) => ep.id === episodeId);
    if (!episode) return [];
  

    console.log('Episode characters URLs:', episode.characters);
  
    return characters.filter((character) => episode.characters.includes(character.url));
  };

  return (
    <div>
      <h1>Эпизоды вселенной Рика и Морти</h1>
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <h2>{episode.name}</h2>
            <p>
              <strong>Episode:</strong> {episode.episode}
            </p>
            <p>
              <strong>Air Date:</strong> {episode.air_date}
            </p>
            <h3>Персонажи:</h3>
            <ul>
              {getCharactersForEpisode(episode.id).map((character) => (
                <li key={character.id}>
                  <Link to={`/characters/${character.id}`}>{character.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodesPage;
