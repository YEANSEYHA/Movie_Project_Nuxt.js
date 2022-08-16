/* import getAllMovies from '../apis/movie' */
/* import { apis } from '../../apis' */
import axios from 'axios'

export const state = () => ({
  movies: null,
});

export const getters = {
  getMovies(state) {
    return state.movies;
  },
};

export const actions = {
  async fetchAllMovie({ commit }) {
    await axios.get(`http://localhost:3001/api/movies`)
      .then(async (response) => {
        await commit("SET_MOVIES", response.data.movies);
        console.log('Data in actions', response.data.movies)
      })
      .catch((err) => {
        const errorMessage = err.message;
        throw new Error(errorMessage);
      });
  },
  async deleteMovie({ dispatch }, { movieId }) {
    await axios.delete(`http://localhost:3001/api/movies/${movieId}`)
      .then(async (response) => {
        await dispatch('fetchAllMovie')
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('err:', err)
        const errorMessage = err.message
        throw new Error(errorMessage)
      })
  }
};
export const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies;
  },
};
