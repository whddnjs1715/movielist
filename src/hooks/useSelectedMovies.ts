import { useRecoilState } from 'recoil';
import { wishMoviesState } from 'atom/atom';
import { MovieListDataModel } from 'model/pages/main/main';

export default function useSelectedMovies() {
    const [selectedMovies, setSelectedMovies] = useRecoilState(wishMoviesState);

    const addSelectedMovie = (movie: MovieListDataModel) => {
        setSelectedMovies(prevSelectedMovies => [...prevSelectedMovies, movie]);
    };

    const removeSelectedMovie = (movieId: number) => {
        setSelectedMovies(prevSelectedMovies => prevSelectedMovies.filter(movie => movie.id !== movieId));
    };

    return { selectedMovies, addSelectedMovie, removeSelectedMovie };
};