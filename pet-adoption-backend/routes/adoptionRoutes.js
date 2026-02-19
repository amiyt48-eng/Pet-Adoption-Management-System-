import express from "express";
const router = express.Router();

import {
  applyAdoption,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
} from "../controllers/adoptionController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

router.post("/", protect, authorize("user"), applyAdoption);
router.get("/my", protect, authorize("user"), getMyApplications);
router.get("/", protect, authorize("admin"), getAllApplications);
router.put("/:id", protect, authorize("admin"), updateApplicationStatus);

export default router;
