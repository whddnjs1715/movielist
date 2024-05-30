import Layout from "components/layout/layout";
import MovieList from "components/movielist/movielist";
import { useRecoilState } from 'recoil';
import { wishMoviesState } from 'atom/atom';
import { MovieListDataModel } from 'model/pages/main/main'
import { useEffect, useState } from "react";
import Pagination from "components/pagination/pagination";

export default function Wishlist() {
    // [Val] wish movie list
    const [wishMovieList, setMovieWishList] = useRecoilState(wishMoviesState);
    // [Val] Current page number
    const [currentPage, setCurrentPage] = useState<number>(1)
    // [Val] Total page number
    const [totalPage, setTotalPage] = useState<number>(1)

    // [func] delete wish list movie
    const onClickDeleteWishMovie = (movie: MovieListDataModel) => {
        const updatedWishlist = wishMovieList.filter(wishlistMovie => wishlistMovie.id !== movie.id);
        setMovieWishList(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        setTotalPage(updatedWishlist.length)
        const len = wishMovieList.filter((val, idx) => {
            return idx<currentPage*20 && idx >= (currentPage-1)*20
        }).length 
        if(len === 1 && currentPage !== 1) setCurrentPage(currentPage-1) 
    }

    // [func] Change Page 
    const onChangePage = (selectPage: number) => {
        setCurrentPage(selectPage)
    }    

    useEffect(() => {        
        if(wishMovieList.length > 0) {
            setTotalPage(wishMovieList.length)
            return
        }
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setMovieWishList(JSON.parse(storedWishlist));
            setTotalPage(JSON.parse(storedWishlist).length)
        }
    }, [])    

    return (
        <>
            <Layout>
                <MovieList 
                    movieList={wishMovieList.filter((val, idx) => {
                        return idx<currentPage*20 && idx >= (currentPage-1)*20
                    })} 
                    onClickWishList={onClickDeleteWishMovie} 
                    pageName="wishlist"
                />
                <Pagination 
                    currentPage={currentPage} 
                    totalPage={totalPage} 
                    onChangePage={onChangePage}
                />
            </Layout>
        </>
    )
}