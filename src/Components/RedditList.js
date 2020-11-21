import RedditItem from "./RedditItem";

function RedditList(props) {

    const subreddit = props.currentSubreddit;

    return( 
        <div className="RedditList">

            <h3>Showing results for: {subreddit.children[0]['data']["subreddit_name_prefixed"]}</h3>
            <br/>
            { subreddit.children.map((item, index) => {
                return <RedditItem key={index} item={item.data}/>
            })}
        </div>
    );

}

export default RedditList;