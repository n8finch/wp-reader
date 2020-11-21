import Book from "./Book";

function BookList(props) {

    const books = props.books;

    return( 
        <div className="RedditList">
            <br/>
            <h3>Showing results for {books.length} Books</h3>
            <br/>
            { books.map((book, index) => {
                return <Book key={index} book={book}/>
            })}
        </div>
    );

}

export default BookList;