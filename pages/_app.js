import AuthState from "../context/auth/authState";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>
      <Component {...pageProps} />
    </AuthState>
  );
};

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default MyApp;
