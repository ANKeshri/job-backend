import express from 'express';
import { employerGetAllApplications, postApplication, jobseekerDeleteApplication, jobseekerGetAllApplications, } from '../controllers/applicationController.js';
import { isAuthorised } from '../middlewares/auth.js';
const router = express.Router();
router.get("/jobseeker/getall", isAuthorised, jobseekerGetAllApplications);
router.get("/employer/getall", isAuthorised, employerGetAllApplications);
router.delete("/delete/:id", isAuthorised, jobseekerDeleteApplication);
router.post("/post", isAuthorised, postApplication);
export default router;