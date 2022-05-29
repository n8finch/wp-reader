import Post from "./Post";

function PostList(props) {

    const posts = props.posts;

    return( 
        <div className="RedditList">
            <br/>
            <h3>Showing results for {posts.length} Posts</h3>
            <br/>
            { posts.map((post, index) => {
                return <Post key={index} post={post}/>
            })}
        </div>
    );

}

export default PostList;