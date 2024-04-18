import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../../../stores/useUserStore";

function LogoutButton() {
	const { clearUser } = useUserActions();

	const navigate = useNavigate();

	function handleLogout() {
		clearUser();
		navigate("/");
	}

	return (
		<Button tag="a" onClick={handleLogout}>
			Logout
		</Button>
	);
}

export default LogoutButton;
