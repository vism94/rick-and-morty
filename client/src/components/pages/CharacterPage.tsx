import React from 'react';
import Row from 'react-bootstrap/Row';
import useCharacters from '../../hooks/useRickAndMorty';
import CharacterCard from '../ui/CharacterCard';

export default function CharactersPage(): JSX.Element {
  const { characters, deleteHandler } = useCharacters();

  return (
    <Row>
      <h1>Персонажи вселенной Рика и Морти</h1>
      <p>Всего персонажей: {characters.length}</p>
      {characters.map((character) => (
        <CharacterCard 
          character={character}
          key={character.id}
          deleteHandler={deleteHandler}
        />
      ))}
    </Row>
  );
}
