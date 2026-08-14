import * as sectionsRepository from "../repositories/sectionsRepository.js";
import { getUserId } from "../auth.js";

const getAllSections = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const sections = await sectionsRepository.getAllSections(user_id);
    return c.json(sections, 200);
};

const getOneSection = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const id = Number(c.req.param("sectionId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const section = await sectionsRepository.getOneSection(id, user_id);
    if (!section) {
        return c.json({ error: "Section not found" }, 404);
    }
    return c.json(section, 200);
};

const addSection = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const section = await c.req.json();
    if (!section.name) {
        return c.json({ error: "Missing section name" }, 400);
    }
    if (!section.goal) {
        return c.json({ error: "Missing section performance goal" }, 400);
    }
    const added_section = await sectionsRepository.addSection(section.name, user_id, section.goal);
    if (!added_section) {
        return c.json({ error: "Addition of section unsuccessful" }, 404);
    }
    return c.json(added_section, 200);
};

const deleteSection = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const id = Number(c.req.param("sectionId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const deleted_section = await sectionsRepository.deleteSection(id, user_id);
    if (!deleted_section) {
        return c.json({ error: "Section removal unsuccessful" }, 404);
    }
    return c.json(deleted_section, 200);
};

const deleteAllSections = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const deleted_sections = await sectionsRepository.deleteAllSections(user_id);
    return c.json(deleted_sections, 200);
};

const modifySection = async (c) => {
    const username = c.get("user");
    const user_id = (await getUserId(username)).id;
    const id = Number(c.req.param("sectionId"));
    if (!Number.isInteger(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const section = await c.req.json();
    if (!section.name) {
        return c.json({ error: "Missing section name" }, 400);
    }
    if (!section.goal) {
        return c.json({ error: "Missing section performance goal" }, 400);
    }
    const modified_section = await sectionsRepository.modifySection(id, user_id, section.name, section.goal);
    if (!modified_section) {
        return c.json({ error: "Section modification unsuccessful" }, 404);
    }
    return c.json(modified_section, 200);
};

export { getAllSections, getOneSection, addSection, deleteSection, deleteAllSections, modifySection };