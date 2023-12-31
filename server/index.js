import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import{ fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";



/* configuration  */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const corsOptions = {
  origin: "https://socialapp-frontend123.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const app = express();
app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors(corsOptions));


app.use("/assets", express.static(path.join(__dirname, "public/assets")));


const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, "public/assets");
},

filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  const filename = file.fieldname + "-" + uniqueSuffix + ext;
  cb(null, filename);
}
});

const upload = multer({storage});
//route with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
// });


//MOGOOSESETUP
const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
   useUnifiedTopology: true}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
   /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
   }).catch((error) => console.log(`error.message: ${error} did not connect`));