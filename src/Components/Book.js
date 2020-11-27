function Book(props) {

    const book = props.book;
    
    // We probably don't need to show the whoooooooooooole text.
    const trimmedText = ( 500 < book.content.length ) ? book.content.substring(0, 450) + "..." : book.content;

    return (
        <div className="RedditItem card">
            <div className="card-body">
                { book.featured_image_url &&
                    <img src={book.featured_image_url} className="card-img-top" alt={book.title} />
                }
                <h5 className="card-title" data-testid="cardTitle">{book.title}</h5>
                <p>Rating: {book.rating} </p>
                <div dangerouslySetInnerHTML={{__html: trimmedText}} />
                <br/>
                <a href={book.permalink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read More...</a>
            </div>
        </div>
    )
}

export default Book