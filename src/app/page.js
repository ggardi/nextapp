import Link from 'next/link';
import { Container, Typography, Box, Button, Paper } from '@mui/material';

export default function Home() {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        // marginTop: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper elevation={0} sx={{ padding: '2rem', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <Link href="/forgot-email" passHref>
            <Button variant="contained" color="primary" disableElevation>
              Forgot Email
            </Button>
          </Link>
        </Box>

      </Paper>
    </Container>
  );
}
