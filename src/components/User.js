import React,{ useEffect, useState } from 'react';
import { getAllUser } from '../utils/api';
import { makeStyles } from '@material-ui/core/styles';
import UserTable from './UserTable';
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

export default function User(props) {
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
        getAllUser().then(response => {
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
        <UserTable setError={props.setError()} data={data} />
    </div>
  );
}
