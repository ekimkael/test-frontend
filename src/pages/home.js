import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
	const [isloading, setIsloading] = useState(true)
	const [movies, setMovies] = useState([])

	useEffect(() => {
		if (movies.length === 0) {
			fetch(
				`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_THEMOVIEDB_API}`
			)
				.then((response) => response.json())
				.then((datas) => {
					setIsloading(false)
					setMovies(datas.results)
				})
		}
	}, [movies.length])

	const sortedMovies = (toBeSorted) => {
		setIsloading(true)
		let sorted = toBeSorted.sort(
			(a, b) => Date.parse(a.release_date) - Date.parse(b.release_date)
		)
		setIsloading(false)
		setMovies(sorted)
	}

	return (
		<div className="container">
			<div className="row justify-content-between my-5">
				<h1>
					<strong>Popular</strong>
				</h1>

				<button
					type="button"
					className="btn btn-primary"
					onClick={() => {
						sortedMovies(movies)
					}}
				>
					Order by last movie release
				</button>
			</div>
			<div className="row">
				{isloading ? (
					<h3>Loading...</h3>
				) : (
					movies.map((movie) => (
						<div key={movie.id} className="col-md-4 mb-4">
							<div className="card">
								<img
									src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
									className="card-img-top"
									alt={movie.title}
								/>
								<div className="card-body">
									<h5 className="card-title">{movie.title}</h5>
									<Link
										className="btn btn-primary btn-block"
										to={`/movie/${movie.id}`}
									>
										See details
									</Link>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	)
}

export default Home
