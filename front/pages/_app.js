import "../app/globals.css"; // Importation du fichier CSS global
import React from "react";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
