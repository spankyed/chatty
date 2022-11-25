import type { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import './home/home.css';
import 'reactflow/dist/style.css';
import "react-sliding-pane/dist/react-sliding-pane.css";
import { MantineProvider } from "@mantine/core";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      colorScheme: 'dark',
      colors: {
        // Add your color
        deepBlue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        // or replace default theme color
        blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        dark: [
          '#d5d7e0',
          '#acaebf',
          '#8c8fa3',
          '#666980',
          '#4d4f66',
          '#34354a',
          '#2b2c3d',
          '#1d1e30',
          '#0c0d21',
          '#01010a',
        ],
      },

      shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
      },

      headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
          h1: { fontSize: 30 },
        },
      },
    }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default MyApp;


