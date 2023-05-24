import { useForm } from "react-hook-form";
import {motion} from "framer-motion";
import {Box, Button, TextField, Typography, useMediaQuery} from "@mui/material";
import {SelectedPage} from "../../state/enums";
import HText from "../../components/HText";

const ContactInfo = ({ setSelectedPage }) => {

    const isAboveMediumScreens = useMediaQuery("(min-width:1000px)");

    const {
        register,
        trigger,
        formState: { errors }
    } = useForm();

    const onSubmit = async (e) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    }

    return (
        <Box
            component="section"
            id="contactus"
            sx={{
                mx: 'auto',
                width: 5/6,
                pt: '5rem',
                pb: '8rem'
            }}
        >
            <Box
                component={motion.div}
                onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
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
                        width: isAboveMediumScreens ? 3/5 : undefined
                    }}
                >
                    <HText>
                        <span style={{color: '#FF6B66'}}>Ready to step off the couch?</span> Join us and become the coach of your own destiny!
                    </HText>
                    <Typography
                        sx={{
                            my: '1.25rem'
                        }}
                    >
                        Whether you have a burning question, an exciting idea, or simply want to connect with our team,
                        we've got you covered. Reach out to us today and discover a world of opportunities waiting for you.
                    </Typography>
                </Box>

                {/*FORM AND IMAGE*/}
                <Box
                    sx={{
                        mt: '2.5rem',
                        justifyContent: 'space-between',
                        gap: '2rem',
                        display: isAboveMediumScreens ? 'flex' : undefined
                    }}
                >
                    <Box
                        component={motion.div}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount:0.5}}
                        transition={{duration: 0.5}}
                        variants={{
                            hidden: { opacity: 0, y:50},
                            visible: { opacity: 1, y: 0}
                        }}
                        sx={{
                            flexBasis: '60%',
                            mt: isAboveMediumScreens ? '0px' : '2.5rem'
                        }}
                    >
                        <form
                            target="_blank"
                            onSubmit={onSubmit}
                            // TODO: Set up for production
                            action={`https://formsubmit.co/${process.env.REACT_APP_MAIL_STRING}`}
                            method="POST"
                        >
                            <input
                                style={{
                                    marginBottom: "1.25rem",
                                    width: '100%',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#FFA6A3',
                                    padding: '0.75rem 1.25rem'
                                }}
                                type="text"
                                placeholder="NAME"
                                {...register("name", {
                                    required: true,
                                    maxLength: 255,
                                })}
                            />
                            {errors.name && (
                                <p
                                    style={{
                                        marginTop: '0.25rem',
                                        color: '#FF6B66'
                                    }}
                                >
                                    {errors.name.type === "required" && "This field is required."}
                                    {errors.name.type === "maxLength" && "Max length is 255 characters."}
                                </p>
                            )}

                            <input
                                style={{
                                    marginBottom: "1.25rem",
                                    width: '100%',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#FFA6A3',
                                    padding: '0.75rem 1.25rem'
                                }}
                                type="text"
                                placeholder="EMAIL"
                                {...register("email", {
                                    required: true,
                                    // RegEx for email, case-insensitive
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                })}
                            />
                            {errors.email && (
                                <p
                                    style={{
                                        marginTop: '0.25rem',
                                        color: '#FF6B66'
                                    }}
                                >
                                    {errors.email.type === "required" && "This field is required."}
                                    {errors.email.type === "pattern" && "Invalid email address."}
                                </p>
                            )}

                            <textarea
                                style={{
                                    marginBottom: "1.25rem",
                                    width: '100%',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#FFA6A3',
                                    padding: '0.75rem 1.25rem'
                                }}
                                rows={4}
                                cols={50}
                                placeholder="MESSAGE"
                                {...register("message", {
                                    required: true,
                                    maxLength: 2555,
                                })}
                            />
                            {errors.message && (
                                <p
                                    style={{
                                        marginTop: '0.25rem',
                                        color: '#FF6B66'
                                    }}
                                >
                                    {errors.message.type === "required" && "This field is required."}
                                    {errors.message.type === "maxLength" && "Max length is 2555 characters."}
                                </p>
                            )}

                            <Button
                                type="submit"
                                sx={{
                                    marginTop: '1.25rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: '#FFC132',
                                    padding: '0.75rem 5rem',
                                    transitionProperty: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
                                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                                    transitionDuration: '500ms'
                                }}
                            >
                                SUBMIT
                            </Button>
                        </form>
                    </Box>

                    <Box
                        component={motion.div}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount:0.5}}
                        transition={{delay: 0.2, duration: 0.5}}
                        variants={{
                            hidden: { opacity: 0, y:50},
                            visible: { opacity: 1, y: 0}
                        }}
                        sx={{
                            position: 'relative',
                            flexBasis: '40%',
                            mt: isAboveMediumScreens ? '0px' : '4rem'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                ...(isAboveMediumScreens && {
                                    "&::before": {
                                        content: 'url(../assets/DevelopText.png)',
                                        position: 'absolute',
                                        bottom: '-5rem',
                                        right: '-2.5rem',
                                        zIndex: '-1'
                                    }
                                })
                            }}
                        >
                            <img
                                style={{
                                    width: '100%'
                                }}
                                alt="contact-us-page-graphic"
                                src="../assets/ContactUsPageGraphic.png"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ContactInfo;
