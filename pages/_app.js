import AuthState from "../context/auth/authState";
import AppState from "../context/app/appState";
const MyApp = ({ Component, pageProps }) => {
  return (
    <AppState>
      <AuthState>
        <Component {...pageProps} />
      </AuthState>
    </AppState>
  );
};

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default MyApp;
