import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client'

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

const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            name
            id
            username
            age
            nationality
        }
    }
`

const DELETE_USER = gql`
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            id
        }
    }
`

function DisplayData() {
    const [movieSearched, setMovieSearched] = useState('');

    //CREATE USER
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState('');

    const [createUser] = useMutation(CREATE_USER);

    //DELETE USER
    const [id, setId] = useState(0);
    const [deleteUser] = useMutation(DELETE_USER);

    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
    const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
    const [fetchMovie, { data: movieSearchedData, error: movieSearchedError }] = useLazyQuery(GET_MOVIE_BY_NAME);

    if (loading) {
        return <h1>data is loading</h1>
    }

    return (
        <div>

            <input type="text" placeholder="name"  onChange={(event) => {
                setName(event.target.value)}} 
            />
            <input type="text" placeholder="username"  onChange={(event) => {
                setUsername(event.target.value)}} 
            />
            <input type="text" placeholder="age"  onChange={(event) => {
                setAge(event.target.value)}} 
            />
            <input type="text" placeholder="nationality"  onChange={(event) => {
                setNationality(event.target.value.toUpperCase())}} 
            />
            <button onClick={() => {
                createUser({variables: {
                    input: {
                        name,
                        username,
                        age: Number(age),
                        nationality
                    }
                }})
                refetch()
            }}>Create User</button>

            <input type="text" placeholder="id" onChange={(event) => {
                setId(event.target.value)
            }}/>

            <button onClick={() => {
                deleteUser({variables: {
                    id: (id)
                }})
                refetch()
            }}>Delete User</button>

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