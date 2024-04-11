import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

function UserList() {
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    // Function to fetch users' names from the backend API
    const fetchUserNames = async () => {
      try {
        const response = await axios.get('/api/users'); // Assuming your API endpoint is /api/users
        const names = response.data.map(user => user.name); // Extracting only the names from the user data
        setUserNames(names); // Update the state with the user names
      } catch (error) {
        console.error('Error fetching user names:', error);
      }
    };

    fetchUserNames(); // Call the function to fetch user names when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h1>User Names</h1>
      <ul>
        {userNames.map(name => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
