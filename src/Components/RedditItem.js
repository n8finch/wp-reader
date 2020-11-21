function RedditItem(props) {

    const item = props.item;
    let featuredImage = ( item.preview && item.preview.enabled  ) ? true : false;
    
    // We probably don't need to show the whoooooooooooole text, if they want to, the user can click on the link and follow up...450 characters should be more than enough for most folks to decide whether or not this is interesting... 😆
    const trimmedText = ( 500 < item.selftext.length ) ? item.selftext.substring(0, 450) + "..." : item.selftext;

    return (
        <div className="RedditItem card">
            { featuredImage &&
                <a href={`https://reddit.com/${item.permalink}`} className="card-link" target="_blank" rel="noopener noreferrer">
                    <img src={item.url} className="card-img-top" alt={item.title} />
                </a>
            }
            <div className="card-body">
                <h5 className="card-title" data-testid="cardTitle">{item.title} (⬆️ {item.ups})</h5>
                <p>{trimmedText}</p>
            </div>
            <div className="card-body">
                <a href={`https://reddit.com/${item.permalink}`} className="card-link" target="_blank" rel="noopener noreferrer">Card link</a>
            </div>
        </div>
    )
}

export default RedditItem