import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangeCredentialsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password change if password fields are filled
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        return;
      }
    }

    try {
      const payload = {};

      // Only include password change if new password is provided
      if (newPassword) {
        payload.currentPassword = currentPassword;
        payload.newPassword = newPassword;
      }

      // Only include username change if new username is provided
      if (newUsername) {
        payload.currentUsername = currentUsername;
        payload.newUsername = newUsername;
      }

      // If no changes, return
      if (Object.keys(payload).length === 0) {
        setError('No changes to update');
        return;
      }

      await axios.post('/api/admin/change-credentials', payload);

      setSuccess('Credentials updated successfully');
      
      // Redirect after successful update
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update credentials');
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Credentials</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              {success}
            </div>
          )}
          
          {/* Username Change Section */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentUsername">
              Current Username
            </label>
            <input
              type="text"
              id="currentUsername"
              value={currentUsername}
              onChange={(e) => setCurrentUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter current username"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newUsername">
              New Username
            </label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new username"
            />
          </div>

          {/* Password Change Section */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter current password"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter new password (optional)"
              minLength={8}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Confirm new password (optional)"
              minLength={8}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Credentials
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeCredentialsPage;