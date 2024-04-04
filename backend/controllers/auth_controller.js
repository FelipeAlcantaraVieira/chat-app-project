export const login = (req, res) => {
    console.log("loginUser");
    res.send("login route");
}

export const logout = (req, res) => {
    console.log("logoutUser");
    res.send("logout route");
}

export const signup = (req, res) => {
    console.log("signupUser");
    res.send("signup route");
}