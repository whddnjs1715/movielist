import React, { useEffect, useRef, useState } from 'react'
import Layout from 'components/layout/layout'
import API from 'service/api'
import { MovieListDataModel } from 'model/pages/main/main'
import { wishMoviesState } from 'atom/atom';
import { useRecoilState } from 'recoil';
const MovieList = React.lazy(() => import('components/movielist/movielist'));
const Pagination = React.lazy(() => import('components/pagination/pagination'));

export default function Main() {
    // [Val] Popular movie list
    const [movieList, setMovieList] = useState<Array<MovieListDataModel>>([])
    // [Val] Current page number
    const [currentPage, setCurrentPage] = useState<number>(1)
    // [Val] Total page number
    const [totalPage, setTotalPage] = useState<number>(1)
    // [Val] wish movie list
    const [wishMovieList, setMovieWishList] = useRecoilState(wishMoviesState);

    // [func] Add wish list movie
    const onClickAddWishListMovie = (movie: MovieListDataModel) => {
        setMovieWishList(prevMovies => [...prevMovies, movie]);
        const updatedWishlist = [...wishMovieList, movie];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };   

    // [func] Change Page 
    const onChangePage = (selectPage: number) => {
        setCurrentPage(selectPage)
    }
    
    // [API] Get Popular movie list
    const getPopMovieListAPI = useRef(
        new API(`https://api.themoviedb.org/3/movie/popular`, 'GET', {
            success: (res) => {
                // console.log(res)
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

    useEffect(() => {
        if(wishMovieList.length > 0) return
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setMovieWishList(JSON.parse(storedWishlist));
        }        
    }, [])

    return (
        <>
            <Layout>
                <MovieList movieList={movieList} onClickWishList={onClickAddWishListMovie} pageName='main'/>
                <Pagination currentPage={currentPage} totalPage={totalPage} onChangePage={onChangePage}/>
            </Layout>
        </>
    )
}

