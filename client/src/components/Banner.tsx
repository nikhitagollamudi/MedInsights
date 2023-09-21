import { Container, Typography } from '@mui/material';

export function Banner() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', padding: '40px 0' }}>
      <Typography variant="h2">Welcome to MedInsights</Typography>
      <Typography variant="h6">Your omni-platform for healthcare needs</Typography>
    </Container>
  );
}
