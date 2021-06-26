import React, { useState, useEffect, useRef } from "react";
import PubSub from "pubsub-js";
import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  paper: {
    height: "100%",
    padding: theme.spacing(1),
  },
  button: {
    height: 55,
    marginRight: theme.spacing(2),
  },
  textField: {
    height: 55,
    marginRight: theme.spacing(2),
  },
  result: {
    width: "50%",
    padding: theme.spacing(1),
  },
}));

export default function Person() {
  const myClass = useStyle();
  const [person, setPerson] = useState(0);
  const [personArr, setPersonArr] = useState([]);
  const [count, setCount] = useState(0);
  const nameRef = useRef();
  const ageRef = useRef();

  useEffect(() => {
    PubSub.publish("personChange", person);
  }, [person]);

  let newPerson = { name: "", age: 0 };

  const handleSubmit = (e) => {
    e.preventDefault();
    newPerson.name = nameRef.current.value;
    newPerson.age = ageRef.current.value;
    const newPersonArr = [...personArr, newPerson];
    const personLength = [...personArr, newPerson].length;
    setPerson(personLength);
    setPersonArr(newPersonArr);
    nameRef.current.value = "";
    ageRef.current.value = "";
  };

  PubSub.subscribe("count Change", (msg, data) => {
    setCount(data * 1);
  });

  return (
    <Paper elevation={2} className={myClass.paper}>
      <Paper elevation={0} className={myClass.paper}>
        <Typography variant="h4" align="center">
          我是Person組件
        </Typography>
      </Paper>
      <Paper elevation={0} className={myClass.paper}>
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            label="Name"
            placeholder="Name"
            inputRef={nameRef}
            className={myClass.textField}
          />
          <TextField
            variant="outlined"
            label="Age"
            placeholder="Age"
            inputRef={ageRef}
            className={myClass.textField}
          />
          <Button
            type="submit"
            variant="contained"
            className={myClass.button}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personArr.map((person) => (
              <TableRow key={person.name}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex" }}>
        <Paper elevation={0} className={myClass.result}>
          <Typography variant="h4">總人數 : {person}</Typography>
        </Paper>
        <Paper elevation={0} className={myClass.result}>
          <Typography variant="h4">上方組件Count為 : {count}</Typography>
        </Paper>
      </div>
    </Paper>
  );
}
