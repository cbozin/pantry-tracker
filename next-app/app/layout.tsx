'use client'
import type { Metadata } from 'next'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import './globals.css'


// const theme = createTheme({
//   typography: {
//     allVariants: {
//       color: "white"
//     },
//   },
  
// });
const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
    }
  },
  // palette: {
  //   mode: 'dark',
  //   primary: { 
  //     main: '#d500f9',
      
  //   }
  // },
  // components: {
  //   MuiAutocomplete: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: '#ffff', // Background color of the Autocomplete
  //       },
  //       inputRoot: {
  //         '& .MuiOutlinedInput-notchedOutline': {
  //           borderColor: '#d500f9', // Border color of the input
  //         },
  //         color: 'black', // Input text color
  //       },
  //       paper: {
  //         backgroundColor: 'white', // Background color of the dropdown
  //         color: 'black', // Text color in the dropdown
  //       },
  //       option: {
  //         '&[aria-selected="true"]': {
  //           backgroundColor: '#1d1d1d', // Background color of selected option
  //         },
  //         '&:hover': {
  //           backgroundColor: '#757575', // Background color on hover
  //         },
  //       },
  //     },
  //   },
  // },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <body >{children}</body>
      </html>
      </ThemeProvider>
  )
}
