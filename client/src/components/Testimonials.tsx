import { Container, Typography, Grid } from '@mui/material';

export function Testimonials() {
    const testimonialsList = [
        { author: 'Shubham', quote: 'Best app ever' },
      // Add testimonial data here
    ];
  
    return (
      <Container sx={{ padding: '40px 0' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>What Our Users Say</Typography>
        <Grid container spacing={3}>
          {testimonialsList.map((testimonial, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="subtitle1">"{testimonial.quote}"</Typography>
              <Typography variant="subtitle2">- {testimonial.author}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
}
  