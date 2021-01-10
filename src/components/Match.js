import React,{ useEffect, useState } from 'react';
import { getAllMatch } from '../utils/api';
import { makeStyles } from '@material-ui/core/styles';
import MatchTable from './MatchTable';    
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        getMatchList()
    }, [])

    const getMatchList = (() => {
        setLoading(true)
        getAllMatch().then(response => {
            setLoading(false)
            if (response.status < 400) {
                console.log(response.data)
                setData(response.data)
            }
        }).catch((error) => {
            props.setError(error.message)
        })
    })

  return (
    <div>
    <TableContainer component={Paper}>
        {loading && ( 
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop> 
            )}
        <MatchTable setError={props.setError()} data={data} />
        </TableContainer>
    </div>
  );
}
