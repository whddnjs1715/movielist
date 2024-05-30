import styled from 'styled-components';
import { MovieListDataModel } from 'model/pages/main/main'
import { useRecoilState } from 'recoil';
import { wishMoviesState } from 'atom/atom';

interface MovieListProps {
    movieList: Array<MovieListDataModel>;
    onClickWishList: (movie: MovieListDataModel) => void
    pageName: string
}

export default function MovieList({ movieList, onClickWishList, pageName }: MovieListProps) {

    const [wishMovieList, setMovieWishList] = useRecoilState(wishMoviesState);

    return (
        <>
            <MovieListContainer>
                {movieList && movieList.map((movie, idx) => (
                    <MovieListMovieItem key={`movie_${idx}`}>
                        {movie.poster_path ? (
                            <MovieListdMovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        ) : (
                            <MovieListDefaultImage />
                        )}
                        <StyledMovieTitle>{movie.title}</StyledMovieTitle>
                        { !wishMovieList.some(item => item.id === movie.id && pageName !== 'wishlist') 
                          && <StyledLikeButton onClick={() => onClickWishList(movie)}>{pageName !== 'wishlist' ? 'wish' : 'delete'}</StyledLikeButton>}
                    </MovieListMovieItem>
                ))}
                {(!movieList || movieList.length < 1 ) && <>No data</>}
            </MovieListContainer>
        </>
    )
}

const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const MovieListMovieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMovieTitle = styled.h3`
  margin: 10px 0;
`;

const StyledLikeButton = styled.button`;
  cursor: pointer;
  background-color: #fff
`;

const MovieListdMovieImage = styled.img`
  width: 100%;
  height: auto;
`;

const MovieListDefaultImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #ccc;
`;