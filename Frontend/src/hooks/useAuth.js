import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAuth = () => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        setIsAuthenticated(!!token);

        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
                setIsAdmin(parsedUser.isAdmin === true);
            } catch (e) {
                console.error("Error parsing user data", e);
                setUser(null);
                setIsAdmin(false);
            }
        } else {
            setUser(null);
            setIsAdmin(false);
        }
    };

    useEffect(() => {
        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener("storage", handleStorageChange);
        // Poll just in case, similar to Navbar
        const interval = setInterval(checkAuth, 1000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    return { user, isAuthenticated, isAdmin };
}
