import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { DatePicker } from "@mui/x-date-pickers";

const registerSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    email: yup.string().max(255).email("invalid email").required("required"),
    password: yup.string().min(5).required("required"),
    location: yup.string().required("required"),
    headline: yup.string().required("required"),
    careerStart: yup.date().required("required"),
    picture: yup.string().required("required")
});

const loginSchema = yup.object().shape({
    email: yup.string().max(255).email("invalid email").required("required"),
    password: yup.string().min(5).required("required")
});

const initialValuesRegister = {
    fullName: "",
    email: "",
    password: "",
    location: "",
    headline: "",
    careerStart: "",
    picture: ""
};

const initialValuesLogin = {
    email: "",
    password: ""
};


const FormTrainer = () => {
    const [pageType, setPageType] = useState("login");
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    // Well, I could have complicated the main form and include checks for User/Trainer
    // But it ruins single responsibility principle
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        // this allows us to send form info with image
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append('picturePath', values.picture.name);

        const savedTrainerResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/auth/registerTrainer`,
            {
                method: "POST",
                body: formData
            }
        );
        const savedTrainer = await savedTrainerResponse.json();
        onSubmitProps.resetForm();

        if (savedTrainer) {
            setPageType("login");
        }
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/auth/loginTrainer`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                    role: loggedIn.role,
                    isMember: loggedIn.isMember
                })
            );
            navigate("/home");
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  resetForm
              }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="Full Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullName}
                                    name="fullName"
                                    error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                                    helperText={touched.fullName && errors.fullName}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <TextField
                                    label="Headline"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.headline}
                                    name="headline"
                                    error={Boolean(touched.headline) && Boolean(errors.headline)}
                                    helperText={touched.headline && errors.headline}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <DatePicker
                                    label="Select your career start date"
                                    disableFuture
                                    onBlur={handleBlur}
                                    // Important! To write custom onChange for this complex component without `name` property
                                    onChange={(date) => setFieldValue("careerStart", date)}
                                    value={values.careerStart}
                                    error={Boolean(touched.careerStart) && Boolean(errors.careerStart)}
                                    helperText={touched.careerStart && errors.careerStart}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" } }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography>
                                                        <EditOutlinedIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main }
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light
                                }
                            }}
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up as Trainer here."
                                : "Already have an account? Log In as Trainer here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default FormTrainer;
