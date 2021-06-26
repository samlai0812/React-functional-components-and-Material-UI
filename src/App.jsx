import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
// import { purple, orange } from "@material-ui/core/colors";
import Layout from "./containers/Layout";
import Count from "./containers/Count";
import Person from "./containers/Person";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      contained: {
        height: 55,
        marginRight: 20,
      },
    },
  },
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Count />
        <hr />
        <Person />
      </Layout>
    </ThemeProvider>
  );
}
