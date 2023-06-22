import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeamCalendar = () => {
    const { teamId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const [calendar, setCalendar] = useState("");

    console.log(calendar);

    const getTrainerCalendar = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers/${teamId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
        });
        const data = await response.json();

        console.log(data);
        console.log(data.calendarIframe);

        setCalendar(data.calendarIframe);
    };

    useEffect(() => {
        getTrainerCalendar();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // TODO: Find better workaround for width and height
    //  Issue with `div` inside `div`. Broken parent-child relation with %
    return (
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >
            {calendar && (
            <iframe
                title="team calendar"
                src={calendar}
                style={{
                    width: "100%",
                    height: "70vh",
                    frameBorder: "0",
                    scrolling: "no"
                }}></iframe>
                )}
        </Box>
    );
};

export default TeamCalendar;
