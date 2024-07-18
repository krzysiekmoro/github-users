import React, {useState} from 'react';
import {searchUsers} from '../services/requestService';
import {BsChevronDown} from 'react-icons/bs';

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
            onClick={() => setSelectedUser(user.login)}
            className='user-item'
          >
            <span className='user-card'>
              {user.login}
              <BsChevronDown className='chevron-icon' />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
