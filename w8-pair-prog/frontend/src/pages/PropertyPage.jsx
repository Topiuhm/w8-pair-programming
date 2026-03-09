import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`/api/properties/${id}`);
      const data = await res.json();
      //console.log(data)
      //console.log(res)
      if (!res.ok) {
        console.log("error", data);
        return;
      }
      setProperty(data);
      setLoading(false);
    }
    fetchProperty();
    //console.log(fetchProperty())
  }, [id]);

  async function deleteProperty(id) {
    const res = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      navigate("/");
    } else {
      console.error("Failed to delete product");
    }
  }


  return (
    <div className="property-preview">
      {loading && <div>loading</div>}
      {property && (
        <>
          <h2>Property details</h2>
          <p>{property.title}</p>
          <p>{property.type}</p>
          <p>{property.description}</p>
          <p>{property.price}</p>
          <p>{property.location.address}</p>
          <p>{property.location.city}</p>
          <p>{property.location.state}</p>
          <p>{property.squareFeet}</p>
          <p>{property.yearBuilt}</p>
          <p>{property.bedrooms}</p>
          <button onClick={() => navigate("/")}>Back</button>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={() => deleteProperty(property._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PropertyPage;
