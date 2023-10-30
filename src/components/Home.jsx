
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Container, Typography } from '@mui/material'

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Web-Authn
      </Typography>
      <Typography variant="h5" component="div">
        Welcome To Home Page
      </Typography>
      <Typography variant="body2">
        This is demonstration of Web-authn with Simple Authentication Flow
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function Home() {
  return (
    <Container>

    <Box sx={{ minWidth: 275, maxWidth: 475 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
    </Container>
  );
}
