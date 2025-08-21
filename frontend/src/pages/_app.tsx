import '../styles/globals.css';
import Layout from '../components/Layout';
import { MyAppProps } from '../types/next-app'; // Import the interface

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
