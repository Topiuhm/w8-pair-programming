import PropertyListing from "./PropertyListing";

const PropertyListings = ({ properties }) => {
  return (
    <div className="property-list">
      {properties.map((property) => <PropertyListing key={property._id} properties={property}/>)}
    </div>
  );
};

export default PropertyListings;
