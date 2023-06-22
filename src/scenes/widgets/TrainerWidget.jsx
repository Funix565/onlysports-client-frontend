import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    CalendarMonthOutlined,
    EmojiEvents
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import TrainerCalendarDialog from "components/TrainerCalendarDialog";

const TrainerWidget = ({trainerId, picturePath}) => {
    const [trainer, setTrainer] = useState(null);
    const [isOpened, setIsOpened] = useState(false);
    const {palette} = useTheme();
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const trainerCanEdit = trainerId === _id;

    const handleCalendarDialog = () => {
        setIsOpened(true);
    };

    const handleClose = () => {
        setIsOpened(false);
    };

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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (!trainer) {
        return null;
    }

    // TODO: Can pass calendarIframe in TrainerCalendarDialog
    const {
        fullName,
        headline,
        location,
        careerStart,
        walletAddress,
        calendarIframe,
        members
    } = trainer;

    return (
        <WidgetWrapper>
            {/* FIRST ROW IMAGE*/}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                // TODO: What onClick route?
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath}/>
                    <Box>
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="h4"
                                color={dark}
                                fontWeight="500"
                                // TODO: What sx with hover?
                            >
                                {fullName}
                            </Typography>
                            <EmojiEvents sx={{color: primary}}/>
                        </Box>
                        <Typography color={medium}>{members.length} fit and healthy members</Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider/>

            {/*SECOND ROW HEADLINE*/}
            <Box p="1rem 0">
                <Typography color={main}>{headline}</Typography>
            </Box>

            <Divider/>

            {/* THIRD ROW HEADLINE*/}
            <Box p="1rem">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{color: main}}/>
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <CalendarMonthOutlined fontSize="large" sx={{color: main}}/>
                    <Typography color={medium}>{dayjs(careerStart).format('DD/MM/YYYY')}</Typography>
                </Box>
            </Box>

            <Divider/>

            {/* FOURTH ROW CALENDAR AND WALLET*/}
            <Box p="1rem 0">
                {trainerCanEdit && (
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Edit Calendar Link</Typography>
                    <IconButton onClick={handleCalendarDialog}>
                        <EditOutlined sx={{color: main}}/>
                    </IconButton>
                </FlexBetween>
                )}
                <FlexBetween>
                    <Typography color={medium}>Wallet</Typography>
                    <Typography color={main} fontWeight="500">
                        {`${walletAddress.slice(0, 5)}...${walletAddress.slice(walletAddress.length - 4)}`}
                    </Typography>
                    {trainerCanEdit && (
                    <IconButton>
                        <EditOutlined sx={{color: main}}/>
                    </IconButton>
                    )}
                </FlexBetween>
            </Box>

            <TrainerCalendarDialog isOpened={isOpened} handleClose={handleClose} />
        </WidgetWrapper>
    );
};

export default TrainerWidget;
