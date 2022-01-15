import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfiniteScroll from "react-infinite-scroll-component";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const [pokemon, setpokemon] = useState([]);
  const [page, setPage] = useState(1);
  const classes = useStyles();

  const getUsers = async () => {
    // console.count("test page number")
    setPage(page + 1);
    const { data } = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=10`);
    // console.log('pokemon', ...data.data);
    setpokemon([...pokemon, ...data.data]);

  }

  useEffect(() => {
    getUsers();
  }, []);
  if (pokemon) {
    // console.log('...', pokemon.pokemon);
  }
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <div className={classes.root}>
          <InfiniteScroll
            dataLength={pokemon.length}
            next={getUsers}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <Grid container spacing={3}>

              {
                pokemon.map((user) => {
                  return (
                    <Grid item xs key={user.id}>
                      <Paper className={classes.paper} >
                        <img src={user.images.small} alt="pokemon" />
                        <div className="heading">
                          <h1 className="header">{user.name}</h1>
                          <h1 className="hp">HP:{user.hp}</h1>
                        </div>
                        <h3 className="attack">Attacks:</h3>
                        <p className="attack">
                          {user.attacks.map((item) => {
                            return item.name;
                          }).join(', ')}
                        </p>
                        <h1>Abilities</h1>
                        <p className="attack">{user.abilities ? user.abilities.map((item) => {
                          return item.name;
                        }).join(', ') : "N/A"}</p>
                      </Paper>
                    </Grid>
                  )
                })
              }
            </Grid>
          </InfiniteScroll>
        </div>
      </Container>


    </div>
  );
}

export default App;
