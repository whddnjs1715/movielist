import Layout from 'components/layout/layout'
import { useEffect, useRef, useState } from 'react'
import API from 'service/api'
import Pagination from 'components/pagination/pagination';
import { MovieListDataModel } from 'model/pages/main/main'
import MovieList from 'components/movielist/movielist'
import { wishMoviesState } from 'atom/atom';
import { useRecoilState } from 'recoil';

export default function Main() {
    // [Val] Popular movie list
    const [movieList, setMovieList] = useState<Array<MovieListDataModel>>([])
    // [Val] Current page number
    const [currentPage, setCurrentPage] = useState<number>(1)
    // [Val] Total page number
    const [totalPage, setTotalPage] = useState<number>(1)
    // [Val]
    const [wishMovieList, setMovieWishList] = useRecoilState(wishMoviesState);

    // [func] Add wish list movie
    const onClickAddWishListMovie = (movie: MovieListDataModel) => {
        const isMovieInWishlist = wishMovieList.some(item => item.id === movie.id);
        if (!isMovieInWishlist) {
            setMovieWishList(prevMovies => [...prevMovies, movie]);
        } else {
            alert(`"${movie.title}is alreadt in wishlist`);
        }
    };   

    // [func] Change Page 
    const onChangePage = (selectPage: number) => {
        setCurrentPage(selectPage)
    }
    
    // [API] Get Popular movie list
    const getPopMovieListAPI = useRef(
        new API(`https://api.themoviedb.org/3/movie/popular`, 'GET', {
            success: (res) => {
                console.log(res)
                setMovieList(res.results ?? [])
                setTotalPage(res.total_pages ?? 0)
                setCurrentPage(res.page ?? 1)
            },
            error: (err) => {
                console.log(err)
            },
        })
    ) 

    useEffect(() => {
        getPopMovieListAPI.current.setUrl(`https://api.themoviedb.org/3/movie/popular?page=${currentPage}`)
        getPopMovieListAPI.current.call()
    }, [currentPage])

    return (
        <>
            <Layout>
                <MovieList movieList={movieList} onClickWishList={onClickAddWishListMovie} pageName='main'/>
                <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={onChangePage}/>
            </Layout>
        </>
    )
}

