import { useState } from "react";

function usePropertyCreate(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const propertyCreate = async (object) => {
        setIsLoading(true);
        setError(null);
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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