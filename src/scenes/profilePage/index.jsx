import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import { Roles, SelectedPage } from "../../state/enums";
import TrainerWidget from "../widgets/TrainerWidget";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [profileType, setProfileType] = useState(null);
    const {userId} = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getProfile = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        })
        const data = await response.json();

        if (data) {
            setUser(data);
            setProfileType(Roles.Trainer);
        } else {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            })
            const data = await response.json();

            if (data) {
                setUser(data);
                setProfileType(Roles.User);
            }
        }
    }

    useEffect(() => {
        getProfile();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    // TODO: Control FriendList. Current User goes to other profile.
    //  They are friends, so don't allow to add myself.
    //  Issues with FriendList on profile page. Unexpected behaviour with state and when Trainer

    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {profileType === Roles.User ? (
                        <UserWidget userId={userId} picturePath={user.picturePath}/>
                    ) : (
                        <TrainerWidget trainerId={userId} picturePath={user.picturePath} />
                        )}
                    <Box m="2rem 0"/>
                    {/*{profileType === Roles.User && <FriendListWidget userId={userId}/>}*/}
                </Box>

                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <Box m="-2rem 0"/>
                    <PostsWidget userId={userId} pageType={SelectedPage.Profile}/>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;