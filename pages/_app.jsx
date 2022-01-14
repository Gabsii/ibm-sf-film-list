import { GeistProvider, CssBaseline } from '@geist-ui/react'
import { ThemeProvider } from 'styled-components';

import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </GeistProvider>
  )
}
export default MyApp
