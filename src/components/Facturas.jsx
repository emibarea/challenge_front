import React, { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { formatDate } from '../utils/date';

const Facturas = ({ facturas }) => {
  const [sortOrder, setSortOrder] = useState(true);

  // Ordenar facturas por total
  const facturasFiltradas = facturas.sort((a, b) => {
    if (sortOrder) {
      return a.total - b.total;
    } else {
      return b.total - a.total;
    }
  });

  return (
    <Box sx={{ width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ paddingX: { xs: "1rem", sm: "0" }, marginTop: "2rem", display: 'flex', flexDirection: 'column', alignItems: "center", gap: "2rem" }}>
        <Box sx={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={() => setSortOrder((prev) => !prev)}>
            Ordenar por Total: {sortOrder ? 'Ascendente' : 'Descendente'}
          </Button>
        </Box>
        <Box sx={{ paddingX: { xs: "1rem", sm: "0" }, marginTop: "2rem", display: 'flex', justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          {facturasFiltradas.map((factura, i) => (
            <Card key={factura.idFactura} elevation={3} sx={{ width: { xs: "auto", sm: "375px" }, height: { xs: "auto", sm: "230px" } }}>
              <CardHeader color='text.primary' title='Factura' />
              <CardContent sx={{ textAlign: "left" }}>
                <Typography><span style={{ fontWeight: 700 }}>ID: </span>{factura.idFactura}</Typography>
                <Typography marginTop="0.5rem"><span style={{ fontWeight: 700 }}>Fecha: </span>{formatDate(factura.fecha)}</Typography>
                <Typography marginTop="0.5rem"><span style={{ fontWeight: 700 }}>Total: </span>{factura.total}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Facturas;
