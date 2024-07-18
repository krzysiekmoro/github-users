import React, {useState, useEffect} from 'react';
import {getUserRepos} from '../services/requestService';
import { MdOutlineStarPurple500 } from "react-icons/md";


interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

const UserRepos: React.FC<{username: string}> = ({username}) => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const repos = await getUserRepos(username);
      setRepos(repos);
    };

    fetchRepos();
  }, [username]);

  return (
    <div className='repos-container'>
      <h2>{username}'s Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <div>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </div>
            <span>{repo.stargazers_count} <MdOutlineStarPurple500/></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRepos;
