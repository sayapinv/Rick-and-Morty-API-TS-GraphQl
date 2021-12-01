import './App.css';
import { useQuery } from '@apollo/client'
import { GET_USERS } from './user';
import React, { useMemo, useState } from 'react';
import { iCharacters } from './interfaces'
import UserContainer from './UserContainer';
import { Pagination } from '@material-ui/lab';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '50ch',
      },
    },
  }),
);


const App: React.FC = () => {

  const [name, setName] = useState('')
  const [page, setPage] = useState(1)

  const { data, loading, error } = useQuery(GET_USERS, {
    variables: {
      name: name,
      page: page
    }
  })

  const characters: iCharacters = useMemo(() => data?.characters || {}, [data])

  const classes = useStyles();


  const debounce = (fn: (e: React.ChangeEvent<HTMLInputElement>) => void , ms:number): (args: React.ChangeEvent<HTMLInputElement>) => void => {
    let timeout: NodeJS.Timeout;
    return function(...args) {
      const fnCall = () => { fn.apply(null, args) }
      clearTimeout(timeout)
      timeout = setTimeout(fnCall, ms)
    }
  }
  let onChange1 = (e:React.ChangeEvent<HTMLInputElement>):void => {
    setName(e.target.value)
  }

  let onChange: (args: React.ChangeEvent<HTMLInputElement>) => void = debounce(onChange1, 500)

  return (
    <div className="main">
      <div className="find_name_user">
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" size="small" label="Search by name" variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)} />
          </form>
        </div>
        {loading ? <h1>loading...</h1> : <UserContainer users={characters.results} error={error} />}
        <div className="pagination">
          {!loading && characters?.info?.pages > 1 && <Pagination onChange={(_, num) => setPage(num)} page={page} count={characters?.info?.pages} color="primary" />}
        </div>
      </div>
  );
}

export default App;
