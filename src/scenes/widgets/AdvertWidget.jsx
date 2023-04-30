import {Typography, Link, useTheme, CardActionArea, CardMedia, Card, CardContent} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
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
            <Card
                style={{borderRadius: "0.75rem", margin: "0.75rem 0"}}>
                <CardActionArea
                    href="https://youtu.be/K8YELRmUb5o"
                    target="_blank" rel="noopener">
                    <CardMedia
                        component="img"
                        height="auto"
                        image="../assets/credit.jpg"
                        alt="video thumbnail"
                    />
                    <CardContent>
                        <FlexBetween>
                            <Typography color={main}>
                                Tutorial
                            </Typography>
                            <Link href="https://youtu.be/K8YELRmUb5o" target="_blank" rel="noopener">
                                https://youtu.be/K8YELRmUb5o
                            </Link>
                        </FlexBetween>
                        <Typography color={medium} m="0.5rem 0">
                            Build a COMPLETE Fullstack Responsive MERN App with Auth, Likes, Dark Mode
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </WidgetWrapper>
    );
};

export default AdvertWidget;