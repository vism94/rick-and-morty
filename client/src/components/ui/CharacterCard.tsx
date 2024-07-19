import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import type { Character } from '../../types/characterTypes';

type CharacterCardProps = {
  character: Character;
  deleteHandler: (id: number) => void;
};

export default function CharacterCard({
  character,
  deleteHandler,
}: CharacterCardProps): JSX.Element {
  const [showAllEpisodes, setShowAllEpisodes] = useState<boolean>(false);
  const maxEpisodesToShow = 1;
  const episodesToShow = showAllEpisodes
    ? character.episode
    : character.episode.slice(0, maxEpisodesToShow);

  return (
    <Col md={4}>
      <Card>
        <Card.Img variant="top" src={character.image} alt={character.name} />
        <Card.Body>
          <Card.Title>{character.name}</Card.Title>
          <Card.Text>
            <strong>Status:</strong> {character.status} <br />
            <strong>Species:</strong> {character.species} <br />
            <strong>Gender:</strong> {character.gender} <br />
            <strong>Location:</strong> {character.location.name} <br />
            <strong>Origin:</strong> {character.origin.name} <br />
            <strong>Episodes:</strong>
            <ul>
              {episodesToShow.map((episodeUrl, index) => (
                <li key={index}>{episodeUrl}</li>
              ))}
            </ul>
          </Card.Text>
          <Button onClick={() => deleteHandler(character.id)} variant="danger">
            Удалить
          </Button>
          <Button variant="primary">
            <Link
              to={`/characters/${character.id}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Подробнее о персонаже
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
