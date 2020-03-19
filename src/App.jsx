import React from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import DataConstructor from "./views/DataConstructor";
import { BrowserRouter, Route } from "react-router-dom";
import HistoBars from "./views/HistoBars";

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box p={10}>
        <BrowserRouter>
          <Route path="/histobars" component={HistoBars} />
          <Route exact path="/" component={DataConstructor} />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
