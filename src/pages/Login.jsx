import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Grid, Alert } from '@mui/material';
import axios from "../axios/axiosConfig";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "", password: ""
  });

  const [errors, setErrors] = useState({
    identifier: false,
    password: false,
    identifierMsg: "",
    passwordMsg: ""
  });

  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: false,
      [`${name}Msg`]: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = true;
        newErrors[`${key}Msg`] = `El campo ${key} no puede estar vacio`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoginError('Datos inválidos');
      setTimeout(() => {
        setLoginError('');
      }, 1500);
      return;
    }

    // Post al backend para login
    try {
      const response = await axios.post('/api/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      
      navigate("/dashboard");
      
    } catch (error) {
      console.error('Error en la autenticación', error);
      setLoginError(error.response.data.message);
    }
  };

  return (
    <Box sx={{ padding: "1rem", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <Box sx={{ width: '460px', maxWidth: "100%", backgroundColor: 'background.paper', padding: 3, borderRadius: 1, boxShadow: 3 }}>
        <Typography textAlign="center" variant="h4" gutterBottom color="primary">
          Inicio de Sesión
        </Typography>
        {loginError && <Alert sx={{marginY: "1rem"}} severity="error">{loginError}</Alert>}
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Email o Usuario"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              fullWidth
              error={errors.identifier}
              helperText={errors.identifierMsg}
              InputLabelProps={{ style: { color: '#050c1a' } }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              error={errors.password}
              helperText={errors.passwordMsg}
              InputLabelProps={{ style: { color: '#050c1a' } }}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Iniciar sesión
          </Button>
        </form>
        <Grid container justifyContent="space-between" mt={2}>
          <Link href="/" variant="body2" color="primary">
            Actualizar contraseña
          </Link>
          <Link href="/register" variant="body2" color="primary">
            Registrarse
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
