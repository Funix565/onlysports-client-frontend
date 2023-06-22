import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { SelectedPage } from "../../state/enums";

const PostsWidget = ({ userId, pageType }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    /*
        Three api-calls.
        On the home page, get all the posts -- getFeedPosts.
        On the profile page, get specific user's posts -- getUserPosts.
        On the team page, get specific trainer's private posts -- getTeamPosts
    */

    const getPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getTeamPosts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${userId}/teamPosts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        if (pageType === SelectedPage.Profile) {
            getUserPosts();
        }
        else if (pageType === SelectedPage.Team) {
            getTeamPosts();
        }
        else if (pageType === SelectedPage.OnlyHome) {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    fullName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${fullName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    );
};

export default PostsWidget;
