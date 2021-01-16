import React,{ useEffect, useState } from 'react';
import { getAllMatch } from '../utils/api';
import { makeStyles } from '@material-ui/core/styles';
import MatchTable from './MatchTable';    
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
    const [data, setData] = useState(null);
    useEffect(() => {
        getMatchList()
    }, [])

    const getMatchList = (() => {
        props.setLoading(true)
        getAllMatch().then(response => {
            props.setError(null)
            props.setLoading(false)
            if (response.status < 400) {
                console.log(response.data)
                setData(response.data)
            }
        }).catch((error) => {
            props.setError("Lấy danh sách trận không thành công")
        })
    })

  return (
    <div>
    <TableContainer component={Paper}>
        <MatchTable setError={props.setError()} data={data} />
        </TableContainer>
    </div>
  );
}
