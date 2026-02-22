import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    addCustomer,
    getCustomers,
    deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", protect, addCustomer);
router.get("/", protect, getCustomers);
router.delete("/:id", protect, deleteCustomer);

export default router;