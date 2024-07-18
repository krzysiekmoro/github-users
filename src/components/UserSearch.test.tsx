import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserSearch from './UserSearch';
import { searchUsers } from '../services/requestService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/requestService', () => ({
  searchUsers: jest.fn(),
}));

const mockedSearchUsers = searchUsers as jest.MockedFunction<typeof searchUsers>;

describe('UserSearch', () => {
  beforeEach(() => {
    mockedSearchUsers.mockClear();
  });

  test('renders search input and button', () => {
    render(<UserSearch />);
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  test('updates input field and calls searchUsers on button click', async () => {
    mockedSearchUsers.mockResolvedValueOnce([
      { id: 1, login: 'testuser1' },
      { id: 2, login: 'testuser2' },
    ]);

    render(<UserSearch />);
    const input = screen.getByPlaceholderText(/Enter username/i);
    const button = screen.getByText(/Search/i);

    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);

    await waitFor(() => expect(mockedSearchUsers).toHaveBeenCalledWith('test'));

    expect(screen.getByText('testuser1')).toBeInTheDocument();
    expect(screen.getByText('testuser2')).toBeInTheDocument();
  });
});
