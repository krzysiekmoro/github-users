import React, {useState} from 'react';
import {searchUsers} from '../services/requestService';
import UserRepos from './UserRepos';
import {BsChevronDown, BsChevronUp} from 'react-icons/bs';

interface User {
  id: number;
  login: string;
}

const UserSearch: React.FC = () => {
  const [username, setUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleSearch = async () => {
    const users = await searchUsers(username);
    setUsers(users);
  };

  const onSelectUser = (user: string) => {
    selectedUser === '' ? setSelectedUser(user) : setSelectedUser('');
  };

  return (
    <div className='search-container'>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='Enter username'
        className='search-input'
      />
      <button onClick={handleSearch} className='search-button'>
        Search
      </button>
      <ul className='user-list'>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => onSelectUser(user.login)}
            className='user-item'
          >
            <span className='user-card'>
              {user.login}
              {selectedUser && selectedUser === user.login ? (
                <BsChevronUp className='chevron-icon' />
              ) : (
                <BsChevronDown className='chevron-icon' />
              )}
            </span>
            {selectedUser && selectedUser === user.login && (
              <UserRepos username={selectedUser} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
