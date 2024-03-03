import express from "express";

const router = express.Router();
import {
  getAllCustomers, populateDummyData,
  
} from "../controllers/customerController.js";

router.route("/").get(getAllCustomers).post(populateDummyData);

export default router;
