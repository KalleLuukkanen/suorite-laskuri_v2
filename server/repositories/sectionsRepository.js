import postgres from "postgres";

const sql = postgres();

const getAllSections = async (user_id) => {
    const result = await sql`
    SELECT *
    FROM sections
    WHERE user_id = ${user_id};`;
    return result;
};

const getOneSection = async (id, user_id) => {
    const result = await sql`
    SELECT *
    FROM sections
    WHERE user_id = ${user_id} AND id = ${id};`;
    return result[0];
};

const addSection = async (section, user_id, goal) => {
    const result = await sql`
    INSERT INTO sections (section, user_id, goal)
    VALUES (${section}, ${user_id}, ${goal})
    RETURNING*;`;
    return result[0];
};

const deleteSection = async (id, user_id) => {
    const result = await sql`
    DELETE
    FROM sections
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;`;
    return result[0];
};

const modifySection = async (id, user_id, new_section, new_goal) => {
    const result = await sql`
    UPDATE sections
    SET section = ${new_section}, goal = ${new_goal}
    WHERE user_id = ${user_id} AND id = ${id}
    RETURNING *;`;
    return result[0];
};

export { getAllSections, getOneSection, addSection, deleteSection, modifySection };