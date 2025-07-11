import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import templateRouter from "./routes/template.routes";
import morgan from "morgan";
import {
  BACKEND_URL,
  CLIENT_URL,
  DEV_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  SESSION_SECRET_KEY,
} from "./config/dotenv";
import adminRouter from "./routes/admin.routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import {
  GoogleCallbackParameters,
  Strategy as GoogleStrategy,
  Profile,
} from "passport-google-oauth20";
import type { Request, Response } from "express";
import { VerifyCallback } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import prisma from "./config/prisma";
import type { CustomUser } from "./types/express";
import projectRouter from "./routes/project.routes";
import genaiRouter from "./routes/genai.routes";
import uploadRouter from "./routes/upload.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      origin === CLIENT_URL ||
      origin === DEV_URL ||
      origin === "http://localhost:3000"
    ) {
      return callback(null, true);
    }
    if (
      process.env.NODE_ENV === "production" &&
      (origin === "https://app.reachoout.com" ||
        origin.endsWith(".reachoout.com"))
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 👇 Apply to all requests FIRST
app.use(cors(corsOptions));

app.use(
  session({
    secret: SESSION_SECRET_KEY || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
      callbackURL: `${BACKEND_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      params: GoogleCallbackParameters,
      profile: Profile,
      done: VerifyCallback
    ) {
      return done(null, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile,
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value!,
        avatarUrl: profile.photos?.[0]?.value!,
      });
    }
  )
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running!");
});

// TODO: move the routes to home router
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL || DEV_URL}`,
  }),
  async (req, res) => {
    try {
      const requestUser = req.user as CustomUser;

      if (!requestUser) {
        return res.redirect(`${CLIENT_URL || DEV_URL}/failed?error=no_user`);
      }

      const googleProfile = requestUser.profile;
      const googleAccessToken = requestUser.accessToken;

      if (!googleProfile) {
        return res.redirect(`${CLIENT_URL || DEV_URL}/failed?error=no_profile`);
      }

      const googleId = googleProfile.id;
      const email = googleProfile.emails?.[0]?.value;
      const name = googleProfile.displayName;
      const avatarUrl = googleProfile.photos?.[0]?.value;

      if (!email) {
        return res.redirect(`${CLIENT_URL || DEV_URL}/failed?error=no_email`);
      }
      // Check if user already exists by Google ID or email
      let user = await prisma.user.findFirst({
        where: {
          OR: [{ googleId: googleId }, { email: email }],
        },
      });

      if (user) {
        // Update existing user with Google data if not already set
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleId,
            name: name || user.name,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create new user
        user = await prisma.user.create({
          data: {
            googleId: googleId,
            email: email,
            name: name || email.split("@")[0], // Fallback name
            avatarUrl: avatarUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      }

      // Create JWT with database user data
      const userPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      };

      const customJWT = jwt.sign(userPayload, JWT_SECRET || "secret", {
        expiresIn: "24h",
      });

      // Set cookies (optional - you mentioned managing on client)
      res.cookie("googleAccessToken", googleAccessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        domain: "reachoout.vercel.app",
      });

      res.cookie("token", customJWT, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        domain: "reachoout.vercel.app",
      });

      res.redirect(`${CLIENT_URL || DEV_URL}/success?token=${customJWT}`);
    } catch (error) {
      console.error("Google OAuth callback error:", error);
      res.redirect(`${CLIENT_URL || DEV_URL}/failed?error=auth_failed`);
    }
  }
);

app.use("/v1/auth", authRouter);
app.use("/v1/template", templateRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/project", projectRouter);
app.use("/v1/genai", genaiRouter);
app.use("/v1", uploadRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
