import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { auth } from "./auth.js";

const app = new Hono();

app.use("/*", cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
//auth
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
        return next();
    }

    c.set("user", session.user.name);
    return next();
});
app.use("/api/*", async (c, next) => {
    const user = c.get("user");
    if (!user) {
        c.status(401);
        return c.json({ message: "Unauthorized" });
    }
    return next();
});

export default app;
