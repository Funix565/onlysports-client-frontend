import { EmojiEvents, PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useEffect, useState } from "react";

const Friend = ({friendId, name, subtitle, userPicturePath}) => {
    // TODO: It could be Trainer as well?
    //  Or create similar component

    // TODO: Wow, this looks incredibly complicated to separate pages based on roles :(
    // Friend feature for User is everywhere but Trainer doesn't have friends. Can't add friends.
    // It means that Post feature where I can add author is also ruined
    // Perhaps now I should figure out how to track Role on almost every page/component
    // And change features based on that: add friend or add member
    // At the same time Trainer can't be Friend of User. So track this behaviour
    // So, User can't add Trainer. And Trainer can't add other Trainer

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);
    const [isTrainer, setIsTrainer] = useState(null);

    // Try to find Trainer with this friendId.
    // We have fewer Trainers, so it is ok to perform a query with the collection ???
    const getTrainer = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${friendId}`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        setIsTrainer(data);
    };

    const patchFriend = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const data = await response.json();
        dispatch(setFriends({friends: data}));
    };

    // TODO: Looks complicated and silly. How to implement in a smarter way?
    useEffect(() => {
        getTrainer();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px"/>
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0); // Dirty workaround. 04:44:30
                    }}
                >
                    {isTrainer ? (
                        <Box display="flex" alignItems="center">
                            <Typography
                                color={main}
                                variant="h5"
                                fontWeight="500"
                                sx={{
                                    "&:hover": {
                                        color: palette.primary.light,
                                        cursor: "pointer"
                                    }
                                }}
                            >
                                {name}
                            </Typography>
                            <EmojiEvents sx={{color: palette.primary.main}}/>
                        </Box>
                    ) : (
                        <Typography
                            color={main}
                            variant="h5"
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {name}
                        </Typography>
                    )}
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {/*Forbid adding yourself as a friend*/}
            {/*No icon for Trainer if User sees Trainer post*/}
            {friendId !== _id && !isTrainer && (
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{backgroundColor: primaryLight, p: "0.6rem"}}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{color: primaryDark}}/>
                    ) : (
                        <PersonAddOutlined sx={{color: primaryDark}}/>
                    )}
                </IconButton>
            )}
        </FlexBetween>
    );
};

export default Friend;