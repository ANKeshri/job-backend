import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        dbName: "Job_seeking_project",


    }).then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.log("Database connection failed");
        console.log(error);
    });
}