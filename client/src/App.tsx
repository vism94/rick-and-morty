import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import CharacterDetailPage from './components/pages/CharacterDetailPage';
import CharactersPage from './components/pages/CharacterPage';
import EpisodeDetailPage from './components/pages/EpisodeDetailPage';
import EpisodesPage from './components/pages/EpisodesPage';

function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/characters',
          element: <CharactersPage />,
        },
        {
          path: '/episodes',
          element: <EpisodesPage />,
        },
        {
          path: '/characters/:id',
          element: <CharacterDetailPage />,
        },
        {
          path: '/episodes/:id',
          element: <EpisodeDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
