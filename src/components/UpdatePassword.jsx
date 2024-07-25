import React, { useState } from 'react';

const UpdatePassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar campos y enviar datos al backend
  };

  return (
    <div>
      <h2>Actualizar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UpdatePassword;