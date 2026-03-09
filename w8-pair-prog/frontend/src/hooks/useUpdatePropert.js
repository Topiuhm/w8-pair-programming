import { useState } from "react";

function usePropertyUpdate(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const propertyUpdate = async (object) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    });
    const property = await response.json();
    //console.log(property);

    if (!response.ok) {
      setError(property.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    return property;
  };

  return { propertyUpdate, isLoading, error };
}

export default usePropertyUpdate;