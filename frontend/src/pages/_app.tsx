import '../styles/globals.css';
import Layout from '../components/Layout';
import { MyAppProps } from '../types/next-app'; // Import the interface
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <Layout>
        <Component {...pageProps} />
        <ToastContainer /> {/* Add ToastContainer */}
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
