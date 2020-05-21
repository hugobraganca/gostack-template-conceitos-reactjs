import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);
  
  async function handleAddRepository() {
    const repositorie = await api.post('repositories', {
      title: `New repositorie ${Date.now()}`,
      url: "https://github.com/hugobraganca/gostack-template-conceitos-nodejs",
      techs: ["React Native", "Node.js"]
    });

    setRepositories([ ...repositories, repositorie.data])
    }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

    repositories.splice(repositorieIndex, 1);
    
    setRepositories([...repositories]);

  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => (
          <li key={repositorie.id}>{repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
          </li>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
