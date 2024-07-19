import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useData from '../../hooks/useRickAndMorty';

function CharacterDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { characters } = useData();

  const character = characters.find((char) => char.id === Number(id));

  if (!character) {
    return <p>Character not found</p>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>
        <strong>Status:</strong> {character.status}
      </p>
      <p>
        <strong>Species:</strong> {character.species}
      </p>
      <p>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p>
        <strong>Location:</strong> {character.location.name}
      </p>
      <p>
        <strong>Origin:</strong> {character.origin.name}
      </p>
      <img src={character.image} alt={character.name} />
      <h2>Episodes:</h2>
      <ul>
        {character.episode.map((episodeName, index) => (
          <li key={index}>
            <Link to={`/episodes/${index + 1}`}>{episodeName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CharacterDetailPage;
