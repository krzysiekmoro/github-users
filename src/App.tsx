import React from 'react';
import UserSearch from './components/UserSearch';
import './App.css'

const App: React.FC = () => {
  return (
    <div>
      <h1>GitHub User Search</h1>
      <UserSearch />
    </div>
  );
};

export default App;
