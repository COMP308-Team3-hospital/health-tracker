import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const SIGN_UP = gql`
  mutation SignUp($username: String!, $password: String!, $email: String!, $name: String!, $gender: String!, $age: Int!, $roleId: String!) {
    signUp(username: $username, password: $password, email: $email, name: $name, gender: $gender, age: $age, roleId: $roleId)
  }
`;

const SignUpForm = () => {
  const [signUp, { loading, error }] = useMutation(SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');
    const name = formData.get('name');
    const gender = formData.get('gender');
    const age = parseInt(formData.get('age'), 10);
    const roleId = formData.get('roleId');

    try {
      await signUp({ variables: { username, password, email, name, gender, age, roleId } });
      // Redirect or show success message
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="text" name="name" placeholder="Name" required />
      <input type="text" name="gender" placeholder="Gender" required />
      <input type="number" name="age" placeholder="Age" required />
      <select name="roleId" required>
        <option value="nurse">Nurse</option>
        <option value="patient">Patient</option>
      </select>
      <button type="submit" disabled={loading}>Sign Up</button>
      {error && <p>Error signing up: {error.message}</p>}
    </form>
  );
};

export default SignUpForm;
