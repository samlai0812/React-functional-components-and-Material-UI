import React, { useEffect, useRef } from "react";
import PubSub from "pubsub-js";
import {
  Paper,
  Typography,
  makeStyles,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  paper: {
    height: "100%",
    padding: theme.spacing(1),
  },
  select: {
    marginLeft: theme.spacing(2),
  },
  result: {
    width: "50%",
    padding: theme.spacing(1),
  },
}));

const numberArr = [1, 2, 3, 4, 5];

export default function Count() {
  const myClass = useStyle();
  const [count, setCount] = React.useState(0);
  const [person, setPerson] = React.useState(0);
  const selectRef = useRef();

  useEffect(() => {
    PubSub.publish("count Change", count);
  }, [count]);

  const handleIncrement = () => {
    setCount(count + selectRef.current.value);
  };
  const handleDecrement = () => {
    setCount(count - selectRef.current.value);
  };
  const handleIncrementIfOdd = () => {
    if (count % 2 !== 0) {
      handleIncrement();
    }
  };
  const handleIncrementAsync = async () => {
    const time = await setTimeout(() => {
      handleIncrement();
      clearTimeout(time);
    }, 800);
  };

  PubSub.subscribe("personChange", (msg, data) => {
    setPerson(data);
  });

  return (
    <Paper elevation={2} className={myClass.paper}>
      <Paper elevation={0} className={myClass.paper}>
        <Typography variant="h4" align="center">
          我是Count組件
        </Typography>
      </Paper>
      <Paper elevation={0} className={myClass.paper}>
        &nbsp;&nbsp;&nbsp;
        <TextField
          className={myClass.select}
          select
          label="Number"
          defaultValue={1}
          inputRef={selectRef}
          variant="outlined"
        >
          {numberArr.map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </TextField>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="contained" onClick={handleIncrement}>
          加
        </Button>
        <Button variant="contained" onClick={handleDecrement}>
          減
        </Button>
        <Button variant="contained" onClick={handleIncrementIfOdd}>
          奇數：加
        </Button>
        <Button variant="contained" onClick={handleIncrementAsync}>
          異步：加
        </Button>
      </Paper>
      <div style={{ display: "flex" }}>
        <Paper elevation={0} className={myClass.result}>
          <Typography variant="h4">Count :{count}</Typography>
        </Paper>
        <Paper elevation={0} className={myClass.result}>
          <Typography variant="h4">下方組件人數為 : {person}</Typography>
        </Paper>
      </div>
    </Paper>
  );
}
