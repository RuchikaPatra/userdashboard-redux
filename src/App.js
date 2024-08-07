import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, removeUser, selectUser } from './redux/usersSlice';
import UserDropdown from './components/UserDropdown';
import UserTable from './components/UserTable';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserSelect = (userId) => {
    const selectedUser = users.find(user => user.id === parseInt(userId));
    setSelectedUsers(prevUsers => [...prevUsers, selectedUser]);
    dispatch(selectUser(userId));
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
    setSelectedUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const availableUsers = users.filter(user => !selectedUsers.some(selectedUser => selectedUser.id === user.id));

  return (
    <div className="App">
      <h1>User Dashboard</h1>
      <UserDropdown
        users={availableUsers}
        onSelect={handleUserSelect}
      />
      <UserTable
        users={selectedUsers}
        onRemove={handleRemoveUser}
      />
    </div>
  );
}

export default App;