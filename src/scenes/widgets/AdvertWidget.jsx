import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Authors
                </Typography>
                <Typography color={medium}>
                    Dmytro Denkin, Serhii Sezonchyk
                </Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={`${process.env.REACT_APP_API_URL}/assets/info4.jpg`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <FlexBetween>
                <Typography color={main}>
                    MassageGurus
                </Typography>
                <Typography color={medium}>
                    massage.com
                </Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                Massage day is the best day of the week.
                Putting the balance back into your life. Licensed and Certified Therapists
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;