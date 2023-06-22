import { createSlice } from "@reduxjs/toolkit";

/*
    The state that will be stored in our Global state.
    This data will be accessible throughout our entire application.
    And we can use it anywhere we want.
*/

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    role: null,
    isMember: null
};

// Reducers are functions that involve modifying the global state.
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.isMember = action.payload.isMember;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isMember = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends do not exist");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        // TODO: Is it ok to treat `user` as User and Trainer? Access different model fields?
        setMembers: (state,  action) => {
            if (state.user) {
                state.user.members = action.payload.members;
            } else {
                console.error("trainer members do not exist");
            }
        },
        setCalendar: (state, action) => {
            if (state.user) {
                state.user.calendarIframe = action.payload.calendarIframe;
            } else {
                console.error("trainer calendarIframe does not exist");
            }
        },
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setMembers, setCalendar } = authSlice.actions;
export default authSlice.reducer;