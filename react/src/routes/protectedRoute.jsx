import { Navigate } from "react-router-dom";

const ProtectedRoute = ({element}) => {
	// TODO: Use authentication token
	const localStorageToken = localStorage.getItem("token");

	return localStorageToken ? element : <Navigate to="/login"  replace />;
};

export default ProtectedRoute;