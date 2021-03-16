import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

function Movie() {
	let { movie_id } = useParams()
	const [isloading, setIsloading] = useState(true)
	const [movie, setMovie] = useState({})
	const [suggestions, setSuggestions] = useState([])

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_THEMOVIEDB_API}`
		)
			.then((response) => response.json())
			.then((datas) => {
				setIsloading(false)
				setMovie(datas)
				//
				fetch(
					`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${process.env.REACT_APP_THEMOVIEDB_API}`
				)
					.then((response) => response.json())
					.then((datas) => {
						setIsloading(false)
						console.log(datas)
						setSuggestions(datas.results)
					})
			})
	}, [movie_id])

	return (
		<div className="container">
			<div className="row my-5">
				{isloading ? (
					<h3>Loading...</h3>
				) : (
					<>
						<div className="col-md-4">
							<img
								src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`}
								alt={movie.title}
								className="img-fluid"
							/>
						</div>
						<div className="col-md-6">
							<h3 className="card-title">
								<b>{movie.title}</b>
							</h3>
							<p className="lead text-muted">{movie.overview}</p>
							<section
								title={movie.adult ? "Adults only" : "Kids can watch this"}
							>
								<ul className="list-group list-group-horizontal">
									<li className="list-group-item">
										{movie.adult ? "🔞" : "👦🏾 👧🏾"}
									</li>
								</ul>
							</section>
						</div>
					</>
				)}
			</div>
			{isloading ? (
				<h3>Loading...</h3>
			) : (
				<>
					<h1>
						<strong>Suggestions</strong>
					</h1>
					<div className="row">
						{suggestions.map((suggestion) => (
							<div key={suggestion.id} className="col-md-4 mb-4">
								<div className="card">
									<img
										src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${suggestion.poster_path}`}
										className="card-img-top"
										alt={suggestion.title}
									/>
									<div className="card-body">
										<h5 className="card-title">{suggestion.title}</h5>
										<Link
											className="btn btn-primary btn-block"
											to={`/movie/${suggestion.id}`}
										>
											See details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</div>
	)
}

export default Movie
