import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";

const verifyToken = async (token) => {
    try {
        const res = await axios.get("/api/auth/verify", {
            headers: { Authorization: token },
        });
        return true;
	} catch (error) {
		return false;
	}
};

const ProtectedRoute = ({ element, usernames = [] }) => {
	const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            const localStorageToken = localStorage.getItem("token");
            const username = localStorage.getItem("username")

            if (!localStorageToken) {
                setIsLoading(false);
                return;
            }

            if (usernames.length > 0 && usernames.filter(u => u === username).length == 0) {
                console.log('herer')
                setIsLoading(false);
                setHasPermission(false)
                
                return
            }

          
            const result = await verifyToken(localStorageToken);
            setIsVerified(result);
            setIsLoading(false);
        };

        checkAuth();
    }, [usernames,navigate]);

    if (isLoading) {
        return null; // or return a loading spinner
    }

    if (!hasPermission) {
        
        return <Navigate to="/no-permission" replace />;

    }

    return isVerified ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
