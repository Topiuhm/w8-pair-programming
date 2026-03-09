import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePropertyUpdate from "../hooks/useUpdatePropert";

const EditPropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { propertyUpdate, error, isLoading } = usePropertyUpdate(`/api/properties/${id}`);

  const [property, setProperty] = useState(null)
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  useEffect(() => {
    const getProperty = async () => {
      const res = await fetch(`/api/properties/${id}`);
      console.log(res)
      if (!res.ok) {
        console.log(error);
        return;
      }

      const p = await res.json();
      console.log(p)
      setProperty(p);
      setTitle(p.title);
      setType(p.type);
      setDescription(p.description);
      setPrice(p.price);
      setAddress(p.location.address);
      setCity(p.location.city);
      setState(p.location.state);
      setSquareFeet(p.squareFeet);
      setYearBuilt(p.yearBuilt);
      setBedrooms(p.bedrooms);
    }
    getProperty();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await propertyUpdate({
      title,
      type,
      description,
      price,
      location: {
        address,
        city,
        state,
      },
      squareFeet,
      yearBuilt,
      bedrooms
    });
    console.log(res)
    if (res) {
      console.log("success")
      navigate("/");
    }
  }

  return (
    <div className="create">
      {isLoading && <div>Loading item...</div>}
      {error && <div>{error}</div>}
      {property && (
        <>
          <h2>Edit {title} estate details</h2>
          <form onSubmit={submitForm}>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Type:</label>
            <select onChange={(e) => setType(e.target.value)}>
              <option type="text" value="Apartment">Apartment</option>
              <option type="text" value="House">House</option>
              <option type="text" value="Commercial">Commercial</option>
            </select>
            <label>Description:</label>
            <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            <label>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" min="0" required />
            <label>Street Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <label>City:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
            <label>State:</label>
            <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
            <label>Square Feet:</label>
            <input type="number" value={squareFeet} onChange={(e) => setSquareFeet(e.target.value)} min="0" required />
            <label>Year Built:</label>
            <input type="number" value={yearBuilt} onChange={(e) => setYearBuilt(e.target.value)} min="1800" required />
            <label>Bedrooms:</label>
            <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} min="0" required />
            <button>Commit changes</button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPropertyPage;
