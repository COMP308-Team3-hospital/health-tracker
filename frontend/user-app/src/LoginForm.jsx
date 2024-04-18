import React from 'react';

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginForm;
