import React, { useState, useEffect } from 'react'
// import React, { Component } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'

function App() {
	// class App extends Component {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		searchField: '',
	// 	}
	// }
	const [robots, setRobots] = useState([])
	const [searchField, setSearchField] = useState('')
	// const [count, setCount] = useState(0)

	// componentDidMount() {
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// 		.then(response => response.json())
	// 		.then(users =>
	// 			this.setState({
	// 				robots: users,
	// 			})
	// 		)
	// }
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => {
				setRobots(users)
			})
		// console.log(count)
	}, [])

	const onSearchChange = event => {
		setSearchField(event.target.value)
	}

	const filteredRobots = robots.filter(robot => {
		return robot.name.toLowerCase().includes(searchField.toLowerCase())
	})
	return !robots.length ? (
		<div>
			<h1 className='tc f1 loadText'>No RoboFriends Found</h1>;
		</div>
	) : (
		<div className='tc'>
			<h1 className='f1'>RoboFriends</h1>
			{/* <button onClick={() => setCount(count + 1)}>Click Me!</button> */}
			<SearchBox searchChange={onSearchChange} />
			<Scroll>
				<ErrorBoundary>
					<CardList robots={filteredRobots} />
				</ErrorBoundary>
			</Scroll>
		</div>
	)
}

export default App
