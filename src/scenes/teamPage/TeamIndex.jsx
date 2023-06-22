import { Box, useMediaQuery } from "@mui/material";
import TrainerWidget from "../widgets/TrainerWidget";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import { Roles, SelectedPage } from "../../state/enums";

const TeamIndex = () => {
    const [trainer, setTrainer] = useState(null);
    const {teamId: trainerId} = useParams();
    const token = useSelector((state) => state.token);
    const role = useSelector((state) => state.role);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const getTrainer = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${trainerId}`,
            {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        setTrainer(data);
    };

    useEffect(() => {
        getTrainer();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!trainer) return null;

    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                <TrainerWidget trainerId={trainerId} picturePath={trainer.picturePath}/>
                <Box m="2rem 0"/>
            </Box>

            <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
            >
                {role === Roles.Trainer && <MyPostWidget picturePath={trainer.picturePath} isPrivate/> }
                <Box m="-2rem 0"/>

                {/*Pass isTeam, show only this team and private*/}
                <PostsWidget userId={trainerId} pageType={SelectedPage.Team}/>
            </Box>
        </Box>
    );
};

export default TeamIndex;
