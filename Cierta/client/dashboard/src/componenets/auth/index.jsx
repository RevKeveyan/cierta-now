// src/pages/AuthPage.js
import { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { loginUser, registerUser, getProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../http-hook/http.hook";

const LoginReg = () => {
  const { request, loadingStatus } = useHttp();
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", role: "user" });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [error, setError] = useState("");

  // если уже логин — проверим роль


  // ===== Login logic =====
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    loginUser(request, loginForm)
      .then((res) => {
        if (res?.token) {
          navigate("/dashboard");
        }
      })
      .catch((err) => setError(err.message));
  };

  // ===== Admin-only Register logic =====
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    registerUser(request, registerForm)
      .then((res) => {
        if (res?.message) {
          alert("User registered");
          setRegisterForm({ name: "", email: "", password: "", role: "user" });
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ===== Login Form ===== */}
      {!isLoggedIn && (
        <Form onSubmit={handleLogin} className="mb-5">
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} required />
          </Form.Group>

          <Button type="submit" className="w-100" disabled={loadingStatus === "loading"}>
            {loadingStatus === "loading" ? <Spinner size="sm" animation="border" /> : "Sign in"}
          </Button>
        </Form>
      )}

      {/* ===== Register Form (ONLY FOR ADMIN) ===== */}
      {isLoggedIn && role === "admin" && (
        <>
          <h4 className="text-center mb-3">Register a new user</h4>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} required />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Role</Form.Label>
              <Form.Select value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="w-100" disabled={loadingStatus === "loading"}>
              {loadingStatus === "loading" ? <Spinner size="sm" animation="border" /> : "Создать пользователя"}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default LoginReg;
