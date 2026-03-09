import { useState, useEffect} from "react"
import PropertyListings from "../components/PropertyListings";

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("/api/properties");
      const data = await res.json();
      if(!res.ok){
        setError(response)
        setLoading(false)
        console.error("Failed to fetch properties:", data.message)
        return;
      }
      setProperties(data);
      setLoading(false);
    }

    fetchProperties();
  }, []);

  return (
    <div className="home">
      {loading && <div>loading</div>}
      {error && <div>{error}</div>}
      {properties && <PropertyListings properties={properties}/>}
    </div>
  );
};

export default Home;
