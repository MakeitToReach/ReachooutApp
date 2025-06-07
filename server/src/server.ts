import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import templateRouter from "./routes/template.routes";
import morgan from "morgan";
import { CLIENT_URL, DEV_URL } from "./config/dotenv";
import adminRouter from "./routes/admin.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Test route
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server is running!");
});

app.use(cors({
    origin: CLIENT_URL || DEV_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/v1/auth", authRouter);
app.use("/v1/template", templateRouter);
app.use("/v1/admin", adminRouter);

// Get all users
// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
