import express from "express";
const router = express.Router();

import {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} from "../controllers/petController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

// Public Routes
router.get("/", getPets);
router.get("/:id", getPetById);

// Admin Routes
router.post("/", protect, authorize("admin"), createPet);
router.put("/:id", protect, authorize("admin"), updatePet);
router.delete("/:id", protect, authorize("admin"), deletePet);

// 👇 VERY IMPORTANT
export default router;
