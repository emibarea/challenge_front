import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Link, Alert } from '@mui/material';
import axios from "../axios/axiosConfig";
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios/axiosConfig';

const Profile = ({ user }) => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      name: user.name
    })
  },[user])

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    name: false,
    usernameMsg: '',
    emailMsg: '',
    nameMsg: ''
  });

  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = true;
        newErrors[`${key}Msg`] = `El campo ${key} no puede estar vacío`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setUpdateError('Datos inválidos');
      setTimeout(() => {
        setUpdateError('');
      }, 1500);
      return;
    }

    try {
      const response = await axios.put(`/api/users/update`, formData);
      console.log(response)
      setUpdateSuccess('Datos actualizados correctamente');
      setTimeout(() => {
        setUpdateSuccess('');
      }, 1500);
    } catch (error) {
      console.error('Error al actualizar los datos', error);
      setUpdateError(error.response ? error.response.data.error : 'Error al actualizar el usuario.');
    }
  };

  return (
    <Box sx={{ padding: "2rem", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" textAlign="center" gutterBottom color="primary">
        Perfil de Usuario
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '500px', mt: 3 }}>
      {updateError && <Alert sx={{marginY: "1rem"}} severity="error">{updateError}</Alert>}
      {updateSuccess && <Alert sx={{marginY: "1rem"}} severity="success">{updateSuccess}</Alert>}

        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.name}
          helperText={errors.nameMsg}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.email}
          helperText={errors.emailMsg}
        />
        <TextField
          label="Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={errors.username}
          helperText={errors.usernameMsg}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Actualizar
        </Button>
      </Box>
    </Box>
  );
};

const PrivateProfile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  useEffect(()=>{
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/")
    } 
    try {
      const getUserData = async () => {
        const response = await axiosClient.get(`/api/users/getData`)
        setUser(response.data)
      }
      getUserData()
    } catch (error) {
      console.error(error.response.data.message)
    }
  },[])

  return(<Profile user={user} />)
}

export default PrivateProfile;
