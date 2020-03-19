import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import DataConstructor from "./DataConstructor";
import { BrowserRouter, Route } from "react-router-dom";
import HistoBars from "./HistoBars";

const data = {
  1: [
    { name: "Scala", value: 120, class: "bblue" },
    { name: "Javascript", value: 120, class: "bgreen" },
    { name: "Java", value: 120, class: "bred" },
    { name: "C#", value: 120, class: "borange" },
  ],
  2: [
    { name: "Scala", value: 130, class: "bblue" },
    { name: "Javascript", value: 140, class: "bgreen" },
    { name: "Java", value: 135, class: "bred" },
    { name: "C#", value: 120, class: "borange" },
  ],
  3: [
    { name: "Scala", value: 140, class: "bblue" },
    { name: "Javascript", value: 120, class: "bgreen" },
    { name: "Java", value: 155, class: "bred" },
    { name: "C#", value: 125, class: "borange" },
  ],
  4: [
    { name: "Scala", value: 145, class: "bblue" },
    { name: "Javascript", value: 130, class: "bgreen" },
    { name: "Java", value: 150, class: "bred" },
    { name: "C#", value: 110, class: "borange" },
  ],
  5: [
    { name: "Scala", value: 160, class: "bblue" },
    { name: "Javascript", value: 140, class: "bgreen" },
    { name: "Java", value: 150, class: "bred" },
    { name: "C#", value: 125, class: "borange" },
  ],
  6: [
    { name: "Scala", value: 580, class: "bblue" },
    { name: "Javascript", value: 170, class: "bgreen" },
    { name: "Java", value: 155, class: "bred" },
    { name: "C#", value: 125, class: "borange" },
  ],
};
const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <BrowserRouter>
        <Route path="/histobars" render={() => <HistoBars data={data} />} />
        <Route exact path="/" component={DataConstructor} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
