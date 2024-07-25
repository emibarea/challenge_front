import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Grid, Alert } from '@mui/material';
import axios from "../axios/axiosConfig";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "", password: "", name: "", email: ""
  });

  const [errors, setErrors] = useState({
    username: false,
    password: false,
    name: false,
    email: false,
    usernameMsg: "",
    passwordMsg: "",
    nameMsg: "",
    emailMsg: ""
  });

  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

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
      setRegisterError('Datos inválidos');
      setTimeout(() => {
        setRegisterError('');
      }, 1500);
      return;
    }

    // Petición al backend para el registro
    try {
      const response = await axios.post('/api/auth/register', formData);
      setRegisterSuccess(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error en el registro', error);
      setRegisterError(error.response.data.message);
    }
  };

  return (
    <Box sx={{ paddingX: "1rem", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <Box sx={{ width: '460px', maxWidth: "100%", backgroundColor: 'background.paper', padding: 3, borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h4" textAlign="center" gutterBottom color="primary">
          Registro
        </Typography>

        {registerError && <Alert sx={{marginY: "1rem"}} severity="error">{registerError}</Alert>}
        {registerSuccess && <Alert sx={{marginY: "1rem"}} severity="success">{registerSuccess}</Alert>}

        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              error={errors.name}
              helperText={errors.nameMsg}
              InputLabelProps={{ style: { color: '#050c1a' } }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              error={errors.email}
              helperText={errors.emailMsg}
              InputLabelProps={{ style: { color: '#050c1a' } }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              fullWidth
              error={errors.username}
              helperText={errors.usernameMsg}
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
            Registrarse
          </Button>
        </form>
        <Grid container justifyContent="space-between" mt={2}>
          Ya tienes una cuenta?
          <Link href="/" variant="body1" color="primary">
            Iniciar sesion
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;
