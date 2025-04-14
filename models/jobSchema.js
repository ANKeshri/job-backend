import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter the job title"],
        minLength: [3, "Job title should have more than 3 characters"],
        maxLength: [50, "Job title cannot exceed 50 characters"],
    },
    description: {
        required: [true, "Please enter the job description"],
        type: String,
        minLength: [50, "Job description should have more than 50 characters"],
        maxLength: [350, "Job description cannot exceed 350 characters"],
    },
    category: {
        type: String,
        required: [true, "Please enter the job category"],

    },
    country: {
        type: String,
        required: [true, "Please enter the job country"],
    },
    city: {
        type: String,
        required: [true, "Please enter the job city"],
    },
    location: {
        type: String,
        required: [true, "Please enter the job location"],
        minLength: [50, "Job location should have more than 50 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Job fixed salary should be greater than 4 digits"],
        maxLength: [9, "Job fixed salary cannot exceed 9 digits"],

    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Job salary from should be greater than 4 digits"],
        maxLength: [9, "Job salary from cannot exceed 9 digits"],

    },
    salaryTo: {
        type: Number,
        minLength: [4, "Job salary to should be greater than 4 digits"],
        maxLength: [9, "Job salary to cannot exceed 9 digits"],
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter the job poster"],
    }

});

export const Job = mongoose.model("Job", jobSchema);