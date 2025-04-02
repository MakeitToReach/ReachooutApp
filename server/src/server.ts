import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import templateRouter from "./routes/template.routes";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server is running!");
});

app.use(cors());
app.use("/v1/auth", authRouter);
app.use("/v1/template", templateRouter);

// Get all users
// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
