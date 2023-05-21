import {
    Villa,
    Diversity1,
    School
} from '@mui/icons-material'
import {Box, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {SelectedPage} from "../../state/enums";
import HText from "components/HText";
import Benefit from "./Benefit";
import ActionButton from "../../components/ActionButton";

const benefits = [
    {
        icon: <Villa sx={{
            height: '1.25rem',
            width: '1.25rem'
        }}/>,
        title: "Connect with Sports Icons",
        description: "Experience the thrill of direct interaction with your favorite sports icons and elevate your fan experience on OnlySports."
    },
    {
        icon: <Diversity1 sx={{
            height: '1.25rem',
            width: '1.25rem'
        }}/>,
        title: "Tools for Trainers",
        description: "Level up your training sessions and bring out the champion in your team."
    },
    {
        icon: <School sx={{
            height: '1.25rem',
            width: '1.25rem'
        }}/>,
        title: "Inspire Others with Your Achievements",
        description: "Become an inspiration to others by sharing your proudest achievements, funniest moments, and valuable experiences on OnlySports."
    },
];

const container ={
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 }
    },
};

const BenefitsInfo = ({setSelectedPage}) => {
    return (
        <Box
            component="section"
            id="benefits"
            sx={{
                mx: 'auto',
                minHeight: '100%',
                width: 5/6,
                py: '5rem'
            }}
        >
            <Box
                component={motion.div}
                onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}
            >
                {/*HEADER*/}
                <Box
                    component={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount:0.5}}
                    transition={{duration: 0.5}}
                    variants={{
                        hidden: { opacity: 0, x:-50},
                        visible: { opacity: 1, x: 0}
                    }}
                    sx={{
                        '@media (min-width: 1060px)': {
                            my: '1.25rem',
                            width: 3/5
                        }
                    }}
                >
                    <HText>More than just a social network</HText>
                    <Typography
                        sx={{
                            my: '1.25rem',
                            fontSize: 'small'
                        }}
                    >
                        Welcome to OnlySports, where passion meets connection.
                        Whether you're a player, a fan, or simply someone who lives and breathes sports,
                        OnlySports is your ultimate destination.
                        Get ready to dive into a world that's more than just a social network.
                        It's a hub of excitement and endless possibilities.
                    </Typography>
                </Box>
                {/*BENEFITS*/}
                <Box
                    component={motion.div}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.5}}
                    variants={container}
                    sx={{
                        // Remove align-items: center, ruined card height
                        justifyContent: 'space-between',
                        gap: '2rem',
                        mt: '1.25rem',
                        '@media (min-width: 1060px)': {
                            display: 'flex'
                        }
                    }}
                >
                    {/*TODO: Fix Text color, links*/}
                    {benefits.map((benefit) => (
                        <Benefit
                            key={benefit.title}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                            setSelectedPage={setSelectedPage}
                        />
                    ))}
                </Box>

                {/*DESCRIPTION AND IMAGE*/}
                <Box
                    sx={{
                        mt: '4rem',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '5rem',
                        '@media (min-width: 1060px)': {
                            mt: '7rem',
                            display: 'flex'
                        }
                    }}
                >
                    {/*GRAPHIC*/}
                    <img
                        style={{marginLeft: 'auto', marginRight: 'auto'}}
                        alt="benefits-page-graphic"
                        src="../assets/BenefitsPageGraphic.png"
                    />

                    {/*DESCRIPTION*/}
                    <Box>
                        {/*TITLE*/}
                        <Box
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <Box
                                sx={{
                                    "&::before": {
                                        position: 'absolute',
                                        top: '-5rem',
                                        left: '-5rem',
                                        zIndex: '-1',
                                        content: 'url(../assets/AbstractWaves.png)'
                                    }
                                }}
                            >
                                <Box
                                    component={motion.div}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{once: true, amount:0.5}}
                                    transition={{duration: 0.5}}
                                    variants={{
                                        hidden: { opacity: 0, x:50},
                                        visible: { opacity: 1, x: 0}
                                    }}
                                >
                                    <HText>
                                        Every member reaches new{" "}
                                        <span style={{color: '#FF6B66'}}>heights</span>
                                    </HText>
                                </Box>
                            </Box>
                        </Box>

                        {/*DESCRIPTION*/}
                        <Box
                            component={motion.div}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, amount:0.5}}
                            transition={{delay: 0.2, duration: 0.5}}
                            variants={{
                                hidden: { opacity: 0, x:50},
                                visible: { opacity: 1, x: 0}
                            }}
                        >
                            <Typography
                                sx={{
                                    my: '1.25rem'
                                }}
                            >
                                In our vibrant sport community, every member embarks on a journey of reaching new heights.
                                We believe in fostering a culture of continuous improvement and healthy motivation.
                                Whether you're a seasoned athlete or just starting your fitness journey,
                                our platform provides the tools and support you need to set and achieve your goals.
                                From tracking your progress and celebrating milestones to connecting with like-minded individuals,
                                our community offers an environment that inspires and uplifts.
                                Join us and experience the thrill of pushing your boundaries and surpassing your own expectations.
                            </Typography>

                            <Typography
                                sx={{
                                    mb: '1.25rem'
                                }}
                            >
                                At OnlySports, we understand that consistent training is the key to success.
                                That's why we've built a platform that not only helps you stay accountable
                                but also adds a touch of gamification to keep you motivated every step of the way.
                                As you engage in your fitness activities, earn badges, unlock achievements,
                                and compete in friendly challenges, you'll find yourself fully immersed in the joy of personal growth.
                                Our innovative features provide insights into your performance, allowing you to analyze your data,
                                set new targets, and tailor your workouts for optimal results. With our community by your side,
                                you'll discover the power of consistent training and unlock new levels of athleticism.
                                Come join us and elevate your fitness journey to unprecedented heights.
                            </Typography>
                        </Box>

                        {/*BUTTON*/}
                        <Box
                            sx={{
                                position: 'relative',
                                mt: '4rem'
                            }}
                        >
                            <Box
                                sx={{
                                    "&::before": {
                                        position: 'absolute',
                                        bottom: '-5rem',
                                        right: '10rem',
                                        zIndex: '-1',
                                        content: 'url(../assets/Sparkles.png)'
                                    }
                                }}
                            >
                                <ActionButton>
                                    Join Now
                                </ActionButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default BenefitsInfo;