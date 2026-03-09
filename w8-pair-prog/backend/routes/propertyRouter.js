const express = require("express");
const router = express.Router();
const {
  getAllProperties,
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyControllers");
const requireAuth = require("../middleware/requireAuth")

// GET /api/properties
router.get("/", getAllProperties);
// GET /api/properties/:propertyId
router.get("/:propertyId", getPropertyById);

router.use(requireAuth);

// POST /api/properties
router.post("/", createProperty);

// PUT /api/properties/:propertyId
router.put("/:propertyId", updateProperty);

// DELETE /api/properties/:propertyId
router.delete("/:propertyId", deleteProperty);

module.exports = router;
