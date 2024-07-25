import { Box, Typography, Link } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{padding: "4rem", width: "100vw", height: "100vh", display: "flex" , justifyContent: "center", alignItems: "start"}}>
    <Box sx={{textAlign: "center", display: "flex", flexDirection: "column"}}>
    <Typography variant='h4' marginTop="1rem" color="text.primary">Esta pagina no esta disponible.</Typography>
    <Link href='/' variant='h5' marginTop="1rem" color="primary">Inicio</Link>
    </Box>
  </Box>
  );
};

export default NotFound;