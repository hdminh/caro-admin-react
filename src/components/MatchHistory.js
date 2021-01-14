import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Board from "./Board";
import Grid from "@material-ui/core/Grid";
import ChatHistory from "../components/ChatHistory";
import { getMatchHistory } from "../utils/api";
const useStyles = makeStyles((theme) => ({
  input: {
    width: "50%",
  },
}));

function MatchHistory(props) {
  const classes = useStyles();
  const [history, setHistory] = useState({ squares: Array(400).fill(null) });
  const [clickHistory, setClickHistory] = useState([]);
  const [currentPos, setCurrentPos] = useState(0);
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);

  let { id } = useParams();
  const handleNextMove = () => {
    if (currentPos < clickHistory.length) {
      setCurrentPos(currentPos + 1);
      props.setError(null);
      let clicks = clickHistory.slice(0, currentPos);
      let squaresList = Array(400).fill(null);
      let index = 0;
      clicks.forEach((click) => {
        squaresList[click] = index % 2 == 0 ? "X" : "O";
        index = index + 1;
      });
      setHistory(squaresList);
    } else {
      props.setError("Không còn nước đi");
    }
  };

  const handlePrevMove = () => {
    if (currentPos > 0) {
      setCurrentPos(currentPos - 1);
      props.setError(null);
      let clicks = clickHistory.slice(0, currentPos);
      let squaresList = Array(400).fill(null);
      let index = 0;
      clicks.forEach((click) => {
        squaresList[click] = index % 2 == 0 ? "X" : "O";
        index = index + 1;
      });
      setHistory(squaresList);
    } else {
      props.setError("Không còn nước đi");
    }
  };

  const mapHistory = () => {
    getMatchHistory(id)
      .then((res) => {
        console.log(res.data);
        res.data.history.forEach((his) => {
          let pos = his.y * 20 + his.x;
          setClickHistory((clickHistory) => clickHistory.concat(pos));
        });
        console.log("chat", res.data.chat);
        console.log("id", res.data);
        setMessages(res.data.chat);
        setRoom("Lịch sử chat");
      })
      .catch((err) => {});
  };

  useEffect(() => {
    mapHistory(props.history);
  }, []);

  const handleClick = (i) => {};

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Grid item>
            <Button onClick={handlePrevMove}>Nước đi trước</Button>
          </Grid>
          <Grid>
            <Button onClick={handleNextMove}>Nước đi kế tiếp</Button>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Typography component="h1" variant="h5">
            Lịch sử trận đấu
          </Typography>
          <Board squares={history} onClick={(i) => handleClick(i)} />
        </Grid>

        <Grid item xs={3}>
          <ChatHistory room={room} messages={messages} />
        </Grid>
      </Grid>
    </div>
  );
}

export default MatchHistory;
