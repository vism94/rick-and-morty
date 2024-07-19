import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useData from '../../hooks/useRickAndMorty';
import type { Character } from '../../types/characterTypes';

function EpisodeDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { episodes, characters } = useData();

  const episode = episodes.find((ep) => ep.id === Number(id));
  const episodeCharacters: Character[] = characters.filter((character) =>
    character.episode.includes(episode?.name || ''),
  );

  if (!episode) {
    return <p>Episode not found</p>;
  }

  return (
    <div>
      <h1>{episode.name}</h1>
      <p>
        <strong>Episode:</strong> {episode.episode}
      </p>
      <p>
        <strong>Air Date:</strong> {episode.air_date}
      </p>
      <h2>Персонажи:</h2>
      <ul>
        {episodeCharacters.map((character) => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EpisodeDetailPage;
