import React, { useState } from 'react'
import axios from 'axios';
import './App.css';
import wpImg from './assets/wp.png';
import BookList from './Components/BookList';

function App() {
	
	// Setup some initial variables and states.
	const url = 'http://wpbooks.local/wp-json/mybooks/v1/all-books/';
	const initialBooks = [];

	const [ fetching, setFetching ] = useState(false);
	const [ books, setBooks ] = useState(initialBooks);

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

		axios.get( url )
			.then((response) => {
				console.log(response.data);
				setBooks(response.data);			
				setFetching(false);

				window.scrollTo(0, 0);
			})
			.catch((error) => {

				let errorBooks = initialBooks;
				errorBooks.message = '🤷‍♀️ Looks like there were no results for that one... 🤷‍♂️';

				setBooks(errorBooks);
				setFetching(false);
			});
		
		// GraphQL
		axios( {
			url: 'http://wpbooks.local/graphql',
			method: 'post',
			data: {
				query: `{
				  books {
					edges {
					  node {
						id
						title
						content
						databaseId
						featuredImage {
						  node {
							altText
							sourceUrl
						  }
						}
					  }
					}
				  }
				}`
			}
		})
			.then((response) => {

				// setBooks(response.data);			
				// setFetching(false);

				console.log(response.data.data.books.edges);

			})
			.catch((error) => {

				let errorBooks = initialBooks;
				errorBooks.message = '🤷‍♀️ Looks like there were no results for that one... 🤷‍♂️';

				// setBooks(errorBooks);
				// setFetching(false);
			});
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={wpImg} className="reddit-logo" alt="reddit"/>
				<h1 className="App-logo" alt="logo"> WP Reader</h1>
				<button className="btn btn-primary" data-testid="searchReddit" onClick={getSubreddit} disabled={fetching ? 'disabled' : ''}>🔍 FetchIt</button>
			</header>

			{fetching && <p className="fetching-text"> <span className="bone-fetch">🦴</span> Going fetch 🐶</p>}

			{books.length > 0 && 
				<>
					<BookList books={books}/>
				</>
			}

			{ ( !books.children || 0 === books.length )  && books.message !== '' && 
				<p className="no-results-message">{books.message}</p>
			}
			
		</div>
	);
}

export default App;
