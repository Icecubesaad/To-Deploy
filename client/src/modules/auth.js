export const Login = () => {
    console.log(process.env.NEXT_PUBLIC_REACT_APP_API_URL)
    window.open(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/google/callback`,
        "_self"
    );
};

export const SignUp = () => {
    window.open(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/google/callback`,
        "_self"
    );
};
export const logout = () => {
    window.open(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auth/logout`, "_self");
};