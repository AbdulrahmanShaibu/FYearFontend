import { useNavigate } from "react-router-dom";

const useLogoutTimer = () => {
    const userIsInactive = useFakeInactiveUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (userIsInactive) {
            fake.logout();
            navigate("/session-timed-out");
        }
    }, [userIsInactive]);
}
export default useLogoutTimer;