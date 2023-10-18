import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_USERNAME } from '../utils/mutations';
import auth from '../utils/auth';

const UserUsernameForm = () => {
  const id = auth.getUser().data._id;
  const [updatedUsername, setNewUsername] = useState('');

  const [updateUserUsername] = useMutation(UPDATE_USER_USERNAME);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(id, updatedUsername);
    try {
      const response = await updateUserUsername({ variables: { id, updatedUsername } });
      console.log('Update response:', response);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder={auth.getUser().data.username}
        value={updatedUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <button type="submit">Update Username</button>
    </form>
  );
};

export default UserUsernameForm;
