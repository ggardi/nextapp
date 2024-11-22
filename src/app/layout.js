'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import './styles/globals.css';  // Import your global CSS

export default function Layout({ children }) {
  const primaryColor = '#262A82';
  const secondaryColor = '#6B6B6B';

  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,  
      },
      secondary: {
        main: secondaryColor,  
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,  
             '&:hover': {
               backgroundColor: '#0056b3',  
             },
            height: '40px',
            padding: "15px 30px",
          },
        },
      },
    },
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Your Page Title</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}  
        </ThemeProvider>
      </body>
    </html>
  );
}
