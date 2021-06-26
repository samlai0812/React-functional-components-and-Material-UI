import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  makeStyles,
  Container,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appbar: {},
  toolbar: theme.mixins.toolbar, // Toolbar 的css

  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  page: {
    backgroundColor: "#f9f9f9",
    width: "100%",
    padding: theme.spacing(1),
  },
}));
export default function Layout({ children }) {
  const myClass = useStyle();
  return (
    <div className={myClass.root}>
      <AppBar className={myClass.appbar}>
        <Toolbar>
          <Avatar src="logo.svg" className={myClass.avatar} />
          <Typography className={myClass.title}>
            React functional components and Material UI
          </Typography>
          <Typography>Sam Lai</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div className={myClass.page}>
          <div className={myClass.toolbar}></div>
          {children}
        </div>
      </Container>
    </div>
  );
}
