import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import InfoPage from "scenes/infoPage";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import TeamPage from "scenes/teamPage";
import { Roles } from "state/enums";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "dayjs/locale/uk";
import TeamAlbum from "scenes/teamPage/TeamAlbum";
import TeamCalendar from "scenes/teamPage/TeamCalendar";
import TeamIndex from "scenes/teamPage/TeamIndex";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));
    const isMember = Boolean(useSelector((state) => state.isMember));

    // TODO: Hm, can I somehow wrap the whole App inside this role context? And then child will have access to Global role?

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
            <div className="app">
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        {/* Reset our CSS to basic CSS, socalled css reset */}
                        <CssBaseline/>
                        <Routes>
                            <Route path="/" element={<InfoPage/>}/>
                            <Route path="/login" element={<LoginPage selectedRole={Roles.User}/>} />
                            <Route path="/loginTrainer" element={<LoginPage selectedRole={Roles.Trainer}/>} />

                            <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/>}/>
                            <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}/>

                            {/*TODO: only trainer and member can access. Should I implement frontend checks based on state?*/}
                            {/* Conditional render. Only trainer and member can see in UI. Direct url access = fail*/}
                            <Route path="/team/:teamId" element={isMember ? <TeamPage/> : <Navigate to="/login"/>}>
                                {/*Child Route will be rendered inside <Outlet />*/}
                                <Route index element={isMember ? <TeamIndex /> : <Navigate to="login" />} />
                                <Route path="members" element={isMember ? <TeamAlbum /> : <Navigate to="/login"/>} />
                                <Route path="calendar" element={isMember ? <TeamCalendar /> : <Navigate to="/login" />} />
                            </Route>
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </div>
        </LocalizationProvider>
    );
}

export default App;
