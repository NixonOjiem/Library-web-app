import React from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import PopularPage from './PopularPage';
import UserProfilePage from './UserProfilePage';
import ManageUsersPage from './ManageUsersPage';
import BrorrowedBooksPage from './BrorrowedBooksPage';
import RemoveBooksPage from './RemoveBooksPage';

function DynamicComponent() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/home':
        return <HomePage />;
      case '/popular':
        return <PopularPage />
      case '/profile':
        return <UserProfilePage />
      case '/users':
        return <ManageUsersPage />
      case '/borrowed-books':
        return <BrorrowedBooksPage />
      case '/add-remove-books':
        return <RemoveBooksPage />
      default:
        return <div>Welcome to the Community Book Store!</div>;
    }
  };

  return (
    <div className='dynamic-container'>
      {renderContent()}
    </div>
  );
}

export default DynamicComponent;