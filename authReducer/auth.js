import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        users: [{
            name: "Jocelyn Atwell",
            email: "jjatwell99@gmail.com",
            password: "2023Blue@99",
        },],
        isAuthenticated: false,
    },

    reducers: {
        signUp: (state, action) => {
            //Extract user information frokm the action payload
            const {email, password, name} = action.payload;

            //Add user data to the array
            state.users.push({ email, password, name });

            //Set isAuthenticated to true after signing up
            state.isAuthenticated = true;
        },
        logIn: (state, action) => {
            //Check if the user exists and the password matches
            const { email, password} = action.payload;
            const user = state.users.find((user) => user.email === email);

            if (user && user.password === password) {
                state.isAuthenticated = true;
            }
        }
    }
})

export const {signUp, logIn} = authSlice.actions;
export default authSlice.reducer;