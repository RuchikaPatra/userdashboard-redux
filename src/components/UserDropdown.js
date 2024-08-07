import React from 'react';

function UserDropdown({ users, onSelect }) {
  return (
    <select className="UserDropdown" onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.id} - {user.name}</option>
      ))}
    </select>
  );
}

export default UserDropdown;