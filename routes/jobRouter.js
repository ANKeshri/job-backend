import express from 'express';
import { getAllJobs, postJob, getMyJobs, updateJob, deleteJob, getSingleJob } from '../controllers/jobController.js';
import { isAuthorised } from '../middlewares/auth.js';

const router = express.Router();
router.get("/getall", getAllJobs);
router.post("/post", isAuthorised, postJob);
router.get("/getmyjobs", isAuthorised, getMyJobs);
router.put("/update/:id", isAuthorised, updateJob);
router.delete("/delete/:id", isAuthorised, deleteJob);
router.get("/:id", isAuthorised, getSingleJob);

export default router;