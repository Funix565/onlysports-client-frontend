import { EmojiEvents, GroupAddOutlined, GroupRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { setMembers } from "../state";
import { useEffect, useState } from "react";

const Member = ({memberId, name, subtitle, userPicturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const members = useSelector((state) => state.user.members);

    const {palette} = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isMember = members.find((member) => member._id === memberId);

    const [isTrainer, setIsTrainer] = useState(null);

    const getTrainer = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${memberId}`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        setIsTrainer(data);
    };

    // Perhaps, I can include this in Friend component and play around with conditions for User and Trainer
    const patchMember = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}/trainers/${_id}/members/${memberId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const data = await response.json();
        dispatch(setMembers({members: data}));
    };

    // TODO: Looks complicated and silly. How to implement in a smarter way?
    useEffect(() => {
        getTrainer();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userPicturePath} size="55px"/>
                <Box
                    onClick={() => {
                        navigate(`/profile/${memberId}`);
                        navigate(0); // Dirty workaround. 04:44:30
                        // He says that without is, component don't re-render
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
            {/*Forbid adding yourself as a member*/}
            {memberId !== _id && !isTrainer && (
                <IconButton
                    onClick={() => patchMember()}
                    sx={{backgroundColor: primaryLight, p: "0.6rem"}}
                >
                    {isMember ? (
                        <GroupRemoveOutlined sx={{color: primaryDark}}/>
                    ) : (
                        <GroupAddOutlined sx={{color: primaryDark}}/>
                    )}
                </IconButton>
            )}
        </FlexBetween>
    );
};

export default Member;
