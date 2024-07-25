import { Grid, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { formatDate } from '../utils/date'; 

const Facturas = ({ facturas }) => {
  return (
    <Box sx={{width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
    <Box sx={{marginTop: "2rem", display: 'flex', justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "2rem"}}>
      {facturas.map((factura, i) => (
          <Card elevation={3} sx={{ width: "375px", height: "200px" }}>
            <CardHeader title={`Factura ${i + 1}`} />
            <CardContent sx={{ textAlign: "left" }}>
              <Typography><span style={{ fontWeight: 700 }}>ID: </span>{factura.idFactura}</Typography>
              <Typography marginTop="0.5rem"><span style={{ fontWeight: 700 }}>Fecha: </span>{formatDate(factura.fecha)}</Typography>
              <Typography marginTop="0.5rem"><span style={{ fontWeight: 700 }}>Total: </span>{factura.total}</Typography>
            </CardContent>
          </Card>
      ))}
    </Box>
    </Box>
  );
};

export default Facturas;