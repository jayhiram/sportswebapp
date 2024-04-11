CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);


// Initialize database schema
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      time VARCHAR(50) NOT NULL,
      location VARCHAR(255) NOT NULL,
      sport VARCHAR(100) NOT NULL
    )`);
    console.log('Database initialized');
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();
