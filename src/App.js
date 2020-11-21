import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import redditSVG from './assets/reddit.svg';
import SearchBox from './Components/SearchBox';
import RedditList from './Components/RedditList';

function App() {
	
	// Setup some initial variables and states.
	const url = 'https://www.reddit.com/r/';
	const initialSubreddit = {
		'page': 0,
		'children': false,
		'after': false,
		'before': false,
		'message': '',
		'subreddit': '',
	};

	const [ fetching, setFetching ] = useState(false);
	const [ currentSubreddit, setSubreddit ] = useState(initialSubreddit);

	/**
	 * Get the subreddit.
	 * 
	 * @param {string} subreddit string from the SearchBox component. 
	 * @param {string} extras suffix for adding the before/after and count to the request.
	 * @param {string} pagination whether this is a new request from the searchbox or a previous or next page request.
	 */
	const getSubreddit = ({subreddit}, extras = '', pagination = 'new' ) => {

		// Setting this to true gives us the fun bone and dog spinner.
		setFetching(true);

		axios.get( url + subreddit + "/new/.json?limit=10" + extras )
			.then((response) => {

				let newSubreddit = {};

				setSubreddit(newSubreddit);			
				setFetching(false);

				window.scrollTo(0, 0);
			})
			.catch((error) => {

				let errorSubreddit = initialSubreddit;
				errorSubreddit.message = '🤷‍♀️ Looks like there were no results for that one... 🤷‍♂️';

				setSubreddit(errorSubreddit);
				setFetching(false);
			});
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={redditSVG} className="reddit-logo" alt="reddit"/>
				<h1 className="App-logo" alt="logo"> WP Reader</h1>
				<SearchBox getSubreddit={getSubreddit} fetching={fetching}/>
			</header>

			{fetching && <p className="fetching-text"> <span className="bone-fetch">🦴</span> Going fetch 🐶</p>}

			{currentSubreddit.children.length > 0 && 
				<>
					<RedditList currentSubreddit={currentSubreddit}/>
				</>
			}

			{ ( !currentSubreddit.children || 0 === currentSubreddit.children.length )  && currentSubreddit.message !== '' && 
				<p className="no-results-message">{currentSubreddit.message}</p>
			}
			
		</div>
	);
}

export default App;
