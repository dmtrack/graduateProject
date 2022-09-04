import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getIsLoggedIn,
    getUsersLoadingStatus,
    loadUsersList,
} from "../../store/slices/userSlice";
import {loadSegmentsList} from "../../store/slices/segmentSlice";
import {loadCitiesList} from "../../store/slices/citySlice";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUsersLoadingStatus());
    useEffect(() => {
        dispatch(loadSegmentsList());
        dispatch(loadCitiesList());
    }, []);
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);


    if (userStatusLoading) return "Loading...";
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};
export default AppLoader;
