import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Context } from "../main";

const Profile = () => {
    const { isAuthenticated, loading, user } = useContext(Context);
    if (loading) {
        return <Loader />;
    }
    if (!isAuthenticated) return <Navigate to={"/login"} />;
    return (
        <div>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
        </div>
    );
};

export default Profile;
