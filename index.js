import express from "express";
import Model from "./models/Model.js";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

const dirname = path.resolve();
dotenv.config();

const app = express();
app.use(express.json());

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
};


// get an event using ID
app.get("/api/v3/app/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    let result = await Model.findOne({ _id: id });
    if (result) resp.status(200).send(result);
    else resp.status(404).send({ result: "No product found" });
  } catch (err) {
    console.log(err);
  }
});


// Creates an event and returns the Id of the event i.e. created
app.post("/api/v3/app/post", async (req, resp) => {
  try {
    // console.log(req.body)
    const {
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;
    const images = req.files;
    // console.log(images)
    const result = await Model.create({
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
      images,
    });

    resp.status(201).json({
      success: true,
      message: { id: result._id },
    });
  } catch (err) {
    console.log(err);
  }
});



// Update an event by its ID
app.put("/api/v3/app/:id", async (req, resp) => {
  try {
    let result = await Model.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    resp.send(result);
  } catch (err) {
    console.log(err);
  }
});


// Deletes an event based on its Unique Id
app.delete("/api/v3/app/:id", async (req, resp) => {
  try {
    const result = await Model.deleteOne({ _id: req.params.id });
    resp.send(result);
  } catch (err) {
    console.log(err);
  }
});



app.listen(8000, () => {
  connectDB();
  console.log("Server is connected");
});
