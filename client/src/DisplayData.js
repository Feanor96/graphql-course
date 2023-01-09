import React from "react";
import { useQuery, useLazyQuery, gql } from '@apollo/client'

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            age
            username
            nationality
        }
    }
`

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies {
        movies {
            name
            yearOfPublication
            isInTheaters
        }
    }
`

const GET_MOVIE_BY_NAME = gql`
    query GetMovieByName($movieName: String!) {
        movie(name: $movieName) {
            name
            yearOfPublication
            isInTheaters
        }
    }
`

function DisplayData() {
    const [movieSearched, setMovieSearched] = React.useState('');

    const { data, loading, error } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] = useLazyQuery(GET_MOVIE_BY_NAME)

    if (error) {
        return <h1>an error occured</h1>
    }

    if (loading) {
        return <h1>data is loading</h1>
    }

    if (data) {
        console.log(data);
    }

    return (
        <div>
            <div>{ data && data.users.map((user) => {
                return (
                    <div>
                        <h1>name: {user.name}</h1>
                    </div>)
            }) }</div>

            <div>{ movieData && movieData.movies.map((movie) => {
                return (
                    <div>
                        <h1>name: {movie.name}</h1>
                    </div>)
            }) }</div>

            <div>
                <input type="text" placeholder="Intersteller..." onChange={(event) => {
                    setMovieSearched(event.target.value)}}
                />
                
                <button onClick={() => {
                    fetchMovie({variables: {
                        movieName: movieSearched
                    }})
                }}>Fetch Data</button>

                <div>{ movieSearchedData && <div>
                    <h3>{movieSearchedData.movie.name}</h3>
                    <h3>{movieSearchedData.movie.yearOfPublication}</h3>
                </div> }</div>
                <div>{ movieSearchedError && <div>
                    <h3>Error finding movie {movieSearched}</h3> 
                </div> }</div>
            </div>
        </div>
    )
}

export default DisplayData;