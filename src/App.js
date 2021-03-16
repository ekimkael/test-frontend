import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/home"
import Movie from "./pages/movie"

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/movie/:movie_id" component={Movie} />
			</Switch>
		</Router>
	)
}

export default App
