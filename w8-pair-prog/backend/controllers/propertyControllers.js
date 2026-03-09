const Property = require("../models/propertyModel");
const mongoose = require('mongoose');

// GET /api/properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: "desc" });
    res.status(200).json(properties)
  } catch (error) {
    res.status(500).json({ message: "Failed to get properties", error: error.message });
  }
};

// POST /api/properties
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body });
    res.status(201).json(newProperty)
  } catch (error) {
    res.status(400).json({ message: "Failed to create property", error: error.message });
  }
};

// GET /api/properties/:propertyId
const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(404).json({ message: "Invalid property ID" });
  }
  try {
    const property = await Property.findById(propertyId)
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve property" })
  }
};

// PUT /api/properties/:propertyId
const updateProperty = async (req, res) => {
  res.send("updateProperty");
};

// DELETE /api/properties/:propertyId
const deleteProperty = async (req, res) => {
  const { propertyId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(404).json({ message: "Invalid property ID" });
  }
  try {
    const deletedProperty = await Property.findByIdAndDelete({_id: propertyId})
    if (deletedProperty) {
      res.status(204).send();
    } else {
      res.status(404).json({message: "Property not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Failed to delete property", error: error.message});
  }
};

module.exports = {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
