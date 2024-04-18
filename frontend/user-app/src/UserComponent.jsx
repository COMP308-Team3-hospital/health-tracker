import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Alert, Button, Form, Container, Nav, Spinner } from "react-bootstrap";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "./queries/authQueries";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [roleId, setRoleId] = useState("nurse"); // Default to "nurse" role
  const [activeTab, setActiveTab] = useState("login");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [randomTip, setRandomTip] = useState(""); // State variable to hold random tip content

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: async () => {
      alert("Login successful!");

      // Fetch random tip upon successful login
      await fetchRandomTip();

      window.dispatchEvent(
        new CustomEvent("loginSuccess", { detail: { isLoggedIn: true } })
      );



    //}
      // else {
      //   setAuthError("Login failed");
      // }



    },
    onError: (error) => setAuthError(error.message || "Login failed"),
  });

  const [register] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => {
      alert("Registration successful! Please log in.");
      setActiveTab("login"); // Switch to login view
    },
    onError: (error) => {
      setAuthError(error.message || "Registration failed");
    },
  });

  //fetching the tips
const fetchRandomTip = async () => {
  try {
    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            tips {
              _id
              content
              date
            }
          }
        `,
      }),
    });
    const { data, errors } = await response.json();
    if (errors) {
      throw new Error(errors[0].message);
    }
    if (data && data.tips && data.tips.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.tips.length);
      const randomTip = data.tips[randomIndex];
      // Display the random tip using toast notification
      toast.success(randomTip.content);
      setRandomTip(randomTip.content);
    } else {
      setAuthError("No tips available");
    }
  } catch (error) {
    setAuthError("Failed to fetch random tip: " + error.message);
  }
};


  //////////////////////////////////////////

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    try {
      if (!username || !password) {
        throw new Error("Username and password are required.");
      }

      console.log("Logging in...");
      await login({ variables: { username, password } });
    } catch (error) {
      setAuthError(error.message || "An error occurred");
    }

    setIsSubmitting(false);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    try {
      if (!username || !password || !email || !name || !gender || !age) {
        throw new Error("All fields are required.");
      }

      console.log("Registering...",username, password, email, name, gender, age, roleId);
      const ageInt = parseInt(age);
      await register({ variables: { username, password, email, name, gender, age: ageInt, roleId } });
    } catch (error) {
      setAuthError(error.message || "An error occurred");
    }

    setIsSubmitting(false);
  };

  return (
    <Container className="p-5">
      <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav.Item>
          <Nav.Link eventKey="login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signup">Sign Up</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "login" ? (
        <Form onSubmit={handleLoginSubmit} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          {authError && <Alert variant="danger">{authError}</Alert>}
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login"}
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleSignUpSubmit} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={roleId} onChange={(e) => setRoleId(e.target.value)}>
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </Form.Select>
          </Form.Group>
          {authError && <Alert variant="danger">{authError}</Alert>}
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Sign Up"}
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default UserComponent;
