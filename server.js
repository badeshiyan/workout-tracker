const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const Workout = require("./models/workout");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/api/workouts", ({ body }, res) => {});

app.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]).then(function (allWorkouts) {
    res.json(allWorkouts);
  });
});

// app.get("/unread", (req, res) => {
//   db.books.find({ read: false }, (error, found) => {
//     if (error) {
//       console.log(error);
//     } else {
//       res.json(found);
//     }
//   });
// });

// app.put("/markread/:id", ({ params }, res) => {
//   db.books.update(
//     {
//       _id: mongojs.ObjectId(params.id),
//     },
//     {
//       $set: {
//         read: true,
//       },
//     },

//     (error, edited) => {
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         console.log(edited);
//         res.send(edited);
//       }
//     }
//   );
// });

// app.put("/markunread/:id", ({ params }, res) => {
//   db.books.update(
//     {
//       _id: mongojs.ObjectId(params.id),
//     },
//     {
//       $set: {
//         read: false,
//       },
//     },

//     (error, edited) => {
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         console.log(edited);
//         res.send(edited);
//       }
//     }
//   );
// });

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
