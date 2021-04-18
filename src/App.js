import React, { useEffect, useContext } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { store } from "./context";

function App() {
  const datos = useContext(store);

  useEffect(() => {
    const data = localStorage.getItem("paktolusCasino");

    if (data) {
      const data2 = JSON.parse(data);
      datos.restoreData(data2);
    }
  }, []);

  return (
    <>
      <CssBaseline />

      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
