import { useEffect, useState } from 'react';

const View = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');

    if (loggedInStatus === 'true' && userEmail) {
      setIsLoggedIn(true);
      setUserEmail(userEmail);
    }
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">View</h2>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {userEmail}!</p>
          {/* Other content for logged-in users */}
        </div>
      ) : (
        <p>Please log in to view this page.</p>
      )}
    </div>
  );
};

export default View;
