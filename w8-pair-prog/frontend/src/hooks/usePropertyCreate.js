import { useState } from "react";

function usePropertyCreate(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;

    const propertyCreate = async (object) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(object),
        });
        const property = await response.json();

        if (!response.ok) {
            setError(property.error);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        return property;
    };

    return { propertyCreate, isLoading, error };
}

export default usePropertyCreate;