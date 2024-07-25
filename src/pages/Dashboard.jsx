import { Box, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosClient from '../axios/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Facturas from '../components/Facturas';

const Dashboard = ({ user, facturas }) => {

  return (
    <Box sx={{paddingY: "4rem", maxWidth: "100vw"}}>
      <Box sx={{textAlign: "center"}}>
      <Typography variant='h3' marginTop="1rem" color="primary">Dashboard</Typography>
      <Typography variant='h5' marginTop="1rem">Bienvenido, {user.name} !</Typography>
      </Box>
      {facturas.length > 0 && <Facturas facturas={facturas} />}
    </Box>
  );
};

const PrivateDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [facturas, setFacturas] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/")
    } else {
      const getUserAndFacturas = async () => {
        try {
          const [userResponse, facturasResponse] = await Promise.all([
            axiosClient.get('/api/users/getData'),
            axiosClient.get('/api/facturas')
          ]);
      
          setUser(userResponse.data);
          setFacturas(facturasResponse.data);
        } catch (error) {
          console.error('Error al obtener datos del usuario y facturas:', error);
        }
      };
      
      getUserAndFacturas();
    }
  },[])

  return(<Dashboard user={user} facturas={facturas} />)
}

export default PrivateDashboard;