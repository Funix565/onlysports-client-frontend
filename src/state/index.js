import { createSlice } from "@reduxjs/toolkit";

/*
    The state that will be stored in our Global state.
    This data will be accessible throughout our entire application.
    And we can use it anywhere we want.
*/
// TODO: Maybe it would be smart to store role User/Trainer or isMember somewhere in state
//  If I plan to use conditional rendering to control UI I have to choose between isMember or Trainer itself
//  I have access to user, so I can check its `trainerId` field
//  And, maybe when the field does not exist, it means Trainer role
//  Btw, I can decode Role from token already. -- No, bad to decode token on frontend
//  Better store role. Backend returns role

// TODO: Backend returns ROLE from `login` endpoint

// TODO: Role looks unnecessary here because information about User or Trainer can't control routing
//  It is member what matters. Does the entity has access to the team?
//  check Membrship approach
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
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setMembers } = authSlice.actions;
export default authSlice.reducer;