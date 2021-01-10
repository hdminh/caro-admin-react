import React,{ useEffect, useState } from 'react';
import { getAllMatch } from '../utils/api';
import { makeStyles } from '@material-ui/core/styles';
import MatchTable from './MatchTable';    
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    search: {
      display: 'flex',
      marginTop: '100px'
    },
    input: {
        width: '50%'
    }
}));

export default function Match(props) {
    const classes = useStyles();
    const [data, setData] = useState(null);
    const [inputText, setInputText] = useState(null)
    useEffect(() => {
        getUserList()
    })

    const handleChange = (event) => {
        setInputText(event.target.value);
      }

    const getUserList = (() => {
        getAllMatch().then(response => {
            if (response.status < 400) {
                setData(response.data)
            }
        }).catch((error) => {
            props.setError(error.message)
        })
    })
  return (
    <div>
        <form className={classes.search} noValidate autoComplete="off" >
            <TextField className={classes.input} 
            id="outlined-basic" 
            label="Search" 
            variant="outlined" 
            value={inputText} 
            onChange={handleChange}
        />
        </form>
        <MatchTable setError={props.setError()} data={data} />
    </div>
  );
}
