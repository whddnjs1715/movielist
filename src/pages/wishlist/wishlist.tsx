import Layout from "components/layout/layout";
import MovieList from "components/movielist/movielist";
import { useRecoilState, useRecoilValue } from 'recoil';
import { wishMoviesState } from 'atom/atom';
import { MovieListDataModel } from 'model/pages/main/main'

export default function Wishlist() {
    // [Val]
    const wishListMovies = useRecoilValue(wishMoviesState);
    const [wishMovieList, setMovieWishList] = useRecoilState(wishMoviesState);

    // [func] delete wish list movie
    const onClickDeleteWishMovie = (movie: MovieListDataModel) => {
        const updatedWishlist = wishMovieList.filter(wishlistMovie => wishlistMovie.id !== movie.id);
        setMovieWishList(updatedWishlist);
    }

    return (
        <>
            <Layout>
                <MovieList movieList={wishListMovies} onClickWishList={onClickDeleteWishMovie} pageName="wishlist"/>
            </Layout>
        </>
    )
}