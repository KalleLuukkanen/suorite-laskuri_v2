import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { auth } from "./auth.js";
import * as sectionsController from "./controllers/sectionsController.js";
import * as performancesController from "./controllers/performancesController.js";

const app = new Hono();

app.use("/*", cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
//auth
app.on(["POST", "GET"], "/api/auth/*", (c) => { return auth.handler(c.req.raw) });

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


//sections
app.get("/api/sections", sectionsController.getAllSections);
app.get("/api/sections/:sectionId", sectionsController.getOneSection);
app.post("/api/sections", sectionsController.addSection);
app.delete("/api/sections/:sectionId", sectionsController.deleteSection);
app.patch("/api/sections/:sectionId", sectionsController.modifySection);

//performances

app.get("/api/performances", performancesController.getAllPerformances);
app.get("/api/performances/phases", performancesController.getPhases);
app.get("/api/performances/phase", performancesController.getAllPerformancesOfPhase);
app.get("/api/performances/efficiencies", performancesController.getEfficiencyByPhaseAndSection);
app.get("/api/performances/:performanceId", performancesController.getOnePerformance);
app.post("/api/performances", performancesController.addPerformance);
app.delete("/api/performances/:performanceId", performancesController.deletePerformance);
app.patch("/api/performances/:performanceId", performancesController.modifyPerformance);


export default app;
