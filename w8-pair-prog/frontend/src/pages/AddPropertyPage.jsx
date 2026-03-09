import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useField from "../hooks/useField.js"
import usePropertyCreate from "../hooks/usePropertyCreate.js"

const AddPropertyPage = () => {
  const navigate = useNavigate();
  const title = useField("text")
  const [type, setType] = useState("Apartment");
  const description = useField("text")
  const price = useField("number")
  const address = useField("text")
  const city = useField("text")
  const state = useField("text")
  const squareFeet = useField("number")
  const yearBuilt = useField("number")
  const bedrooms = useField("number")

  const { propertyCreate, error, isLoading } = usePropertyCreate("/api/properties");

  async function submitForm(e) {
    e.preventDefault();
    const response = await propertyCreate({
      title: title.value,
      type,
      description: description.value,
      price: price.value,
      location: {
        address: address.value,
        city: city.value,
        state: state.value,
      },
      squareFeet: squareFeet.value,
      yearBuilt: yearBuilt.value,
      bedrooms: bedrooms.value
    });
    if (response) {
      console.log("success")
      navigate("/");
    }
    console.log("Form submitted");
  };

  return (
    <div className="create">
      <h2>Add a New Property</h2>
      <form onSubmit={submitForm}>
        <label>Title:</label>
        <input {...title} required />
        <label>Type:</label>
        <select onChange={(e) => setType(e.target.value)}>
          <option type="text" value="Apartment">Apartment</option>
          <option type="text" value="House">House</option>
          <option type="text" value="Commercial">Commercial</option>
        </select>
        <label>Description:</label>
        <textarea {...description} required></textarea>
        <label>Price:</label>
        <input {...price} step="0.01" min="0" required />
        <label>Street Address:</label>
        <input {...address} required />
        <label>City:</label>
        <input {...city} required />
        <label>State:</label>
        <input {...state} required />
        <label>Square Feet:</label>
        <input {...squareFeet} min="0" required />
        <label>Year Built:</label>
        <input {...yearBuilt} min="1800" required />
        <label>Bedrooms:</label>
        <input {...bedrooms} min="0" required />
        <button>Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyPage;
