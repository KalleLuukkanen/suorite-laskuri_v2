import * as performancesRepository from "../repositories/performancesRepository.js";
import { getUserId } from "../auth.js";

const getAllPerformances = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const performances = await performancesRepository.getAllPerformances(user_id);
    return c.json(performances, 200);
};

const getAllPerformancesOfPhase = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const phase_start = c.req.query("phase_start");
    const phase_end = c.req.query("phase_end");
    if (!phase_start || !phase_end) {
        return c.json({ error: "Missing required parameters." }, 400);
    }
    const performances = await performancesRepository.getAllPerformancesOfPhase(user_id, phase_start, phase_end);
    return c.json(performances, 200);
};

const getPhases = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const phases = await performancesRepository.getPhases(user_id);
    return c.json(phases, 200);
};

const getEfficiencyByPhaseAndSection = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const efficiencies = await performancesRepository.getEfficiencyByPhaseAndSection(user_id);
    return c.json(efficiencies, 200);
};

const getOnePerformance = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const id = Number(c.req.param("performanceId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const performance = await performancesRepository.getOnePerformance(user_id, id);
    if (!performance) {
        return c.json({ error: "Performance not found." }, 404);
    }
    return c.json(performance, 200);
};

const addPerformance = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const data = await c.req.json();
    if (!data.workdate || !data.worksection || !data.hours_spent || !data.performance_hours) {
        return c.json({ error: "Missing required parameters." }, 400);
    }
    const performance = await performancesRepository.addPerformance(user_id, data.worksection, data.workdate, data.hours_spent, data.performance_hours);
    if (!performance) {
        return c.json({ error: "Addition of performance unsuccessful." }, 400);
    }
    return c.json(performance, 200);
};

const deletePerformance = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const id = Number(c.req.param("performanceId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const performance = await performancesRepository.deletePerformance(id, user_id);
    if (!performance) {
        return c.json({ error: "Deletion of performance unsuccessful." }, 400);
    }
    return c.json(performance, 200);
};

const deleteAllPerformances = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const performances = await performancesRepository.deleteAllPerformances(user_id);
    return c.json(performances, 200);
};

const modifyPerformance = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const id = Number(c.req.param("performanceId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const data = await c.req.json();
    if (!data.workdate || !data.worksection || !data.hours_spent || !data.performance_hours) {
        return c.json({ error: "Missing required parameters." }, 404);
    }
    const performance = await performancesRepository.modifyPerformance(id, user_id, data.worksection, data.workdate, data.hours_spent, data.performance_hours);
    if (!performance) {
        return c.json({ error: "Modification of performance unsuccessful." }, 400);
    }
    return c.json(performance, 200);
};

export { getAllPerformances, getAllPerformancesOfPhase, getPhases, getEfficiencyByPhaseAndSection, getOnePerformance, addPerformance, deletePerformance, deleteAllPerformances, modifyPerformance };
