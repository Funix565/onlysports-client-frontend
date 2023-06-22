import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar";
import { Outlet, useParams } from "react-router-dom";
import TeamNavbar from "./TeamNavbar";

// TODO: Similar logic  as on ProfilePage
//  initially grab all private posts of current Trainer -- getTeamPosts
//  MyPostWidget with isPrivate=true only
//  Pay attention that only private posts of this Trainer are returned
//  state update and maybe add backend-filtering

const TeamPage = () => {
    const { teamId: trainerId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    return (
        <Box>
            <Navbar/>
            <TeamNavbar teamId={trainerId} />
            {/*<Box*/}
            {/*    width="100%"*/}
            {/*    padding="2rem 6%"*/}
            {/*    display={isNonMobileScreens ? "flex" : "block"}*/}
            {/*    gap="2rem"*/}
            {/*    justifyContent="center"*/}
            {/*>*/}
                {/*Here we render child Route components*/}
                <Outlet />
            {/*</Box>*/}
        </Box>
    );
};

export default TeamPage;
