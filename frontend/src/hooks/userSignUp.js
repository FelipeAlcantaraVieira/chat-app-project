import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { authUser, setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (success === false) return;
		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			console.log(authUser, "usersignup.js");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        console.log({ fullName, username, password, confirmPassword, gender });
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (!regex.test(password)) {
        toast.error("Password must have 6 characters and at least one letter and one number");
        return false;
    }
}