const PropertyListing = ({ properties }) => {
  return (
    <div className="property-preview">
      <h2>{properties.title}</h2>
      <p>Type: {properties.type}</p>
      <p>Price: ${properties.price}</p>
      <p>Location: {properties.location?.city}, {properties.location?.state}</p>
      <p>Bedrooms: {properties.bedrooms}</p>
    </div>
  );
};

export default PropertyListing;
