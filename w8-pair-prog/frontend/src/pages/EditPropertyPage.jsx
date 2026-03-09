import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usePropertyUpdate from "../hooks/useUpdatePropert";

const EditPropertyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { propertyUpdate, error, isLoading } = usePropertyUpdate("/api/properties");

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
      if (!res.ok) {
        console.log(error);
        return;
      }

      const p = res.json();
      setProperty(p);
      setTitle(p.title);
      setType(p.type);
      setDescription(p.description);
      setPrice(p.price);
      setAddress(p.address);
      setCity(p.city);
      setState(p.state);
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
      <h2>Update Property</h2>
    </div>
  );
};

export default EditPropertyPage;
