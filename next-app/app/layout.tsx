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
    mode: 'dark',
  },
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
