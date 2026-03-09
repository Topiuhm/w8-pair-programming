import { Link } from "react-router-dom"

const PropertyListing = ({ properties }) => {
  return (
    <div className="property-preview"><Link to={`/property/${properties._id}`}>
      <h2>{properties.title}</h2></Link>
      <p>Type: {properties.type}</p>
      <p>Price: ${properties.price}</p>
      <p>Location: {properties.location?.city}, {properties.location?.state}</p>
      <p>Bedrooms: {properties.bedrooms}</p>
    </div>
  );
};

export default PropertyListing;
