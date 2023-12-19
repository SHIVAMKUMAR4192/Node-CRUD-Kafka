const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mockUser = {
  username: 'user',
  passwordHash: bcrypt.hashSync('shivamkumar', 10),
};

async function authenticateUser(username, password) {
  console.log('Received credentials:', { username, password });
  const user = mockUser;
  console.log('Stored user credentials:', { username: user.username, passwordHash: user.passwordHash });

  try {
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (passwordMatch) {
      console.log('Authentication successful');
      return {
        username: username,
      };
    } else {
      console.log('Password does not match');
    }
  } catch (error) {
    console.error('Error during password comparison:', error.message);
  }

  console.log('Authentication failed');
  return null;
}

function generateToken(user) {
  return jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = {
  authenticateUser,
  generateToken,
};
