import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

export function Services() {
  const serviceList = [
    { title: 'Appointment Booking', description: 'Book your next appointment with ease.' },
    { title: 'Insurance Purchase', description: 'Get the best insurance deals.' },
    { title: 'Online Chat', description: 'Connect with doctors online instantly.' },
    // ... add more services as needed
  ];

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>Our Services</Typography>
      <Grid container spacing={3}>
        {serviceList.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.title}</Typography>
                <Typography>{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
