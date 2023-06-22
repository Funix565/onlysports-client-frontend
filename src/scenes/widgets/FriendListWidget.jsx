import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

// TODO: Trainer doesn't have friends, so DON'T show this component on home page if Trainer role
const FriendListWidget = ({userId}) => {

    // TODO: FriendList feature is completely broken ~perhaps only on ProfilePage
    //  Mess in state. useSelector subscription and update
    //  Firstly, it tries to render all friends from the current state.
    //  Then `useEffect` executes, network request, dispatch setFriends.
    //  This of course updates the friends in state.
    //  And this somehow affects the Post component. Add/Remove is not in sync.
    //  Why? Because when we visit ProfilePage we fill state with that profile friends
    //  And of course that profile doesn't have itself as a friend

    const dispatch = useDispatch();
    const {palette} = useTheme();
    const token = useSelector((state) => state.token);


    // TODO: Try same approach as in Members. Don't use global state here
    const friends = useSelector((state) => state.user.friends);

    /*
        Displays not only friends of current logged in user.
        Also if we click on someone else's profile.
    */
    const getFriends = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${userId}/friends`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );

        const data = await response.json();
        dispatch(setFriends({friends: data}));
    };

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{mb: "1.5rem"}}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {/*TODO: Question mark?*/}
                {friends?.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.fullName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;