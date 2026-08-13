import postgres from "postgres";

const sql = postgres();

const getAllPerformances = async (user_id) => {
    const result = await sql`
    SELECT *
    FROM performances
    WHERE user_id = ${user_id};`;
    return result;
};

const getAllPerformancesOfPhase = async (user_id, phase_start, phase_end) => {
    const result = await sql`
    SELECT *
    FROM performances
    WHERE user_id = ${user_id} AND workdate >= ${phase_start} AND workdate <= ${phase_end};`;
    return result;
};

//get phases which contain a performance
const getPhases = async (user_id) => {
    const result = await sql`
    SELECT DISTINCT
        CASE
            WHEN EXTRACT(DAY FROM workdate) <= 15
            THEN DATE_TRUNC('month', workdate)::date
            ELSE (DATE_TRUNC('month', workdate) + INTERVAL '15 days')::date
        END AS phase_start,

        CASE
            WHEN EXTRACT(DAY FROM workdate) <= 15
            THEN (DATE_TRUNC('month', workdate) + INTERVAL '14 days')::date
            ELSE (DATE_TRUNC('month', workdate) + INTERVAL '1 month - 1 day')::date
        END AS phase_end,

        EXTRACT(YEAR FROM workdate) AS y,
        EXTRACT(MONTH FROM workdate) AS m,

        CASE
            WHEN EXTRACT(DAY FROM workdate) <= 15 THEN 1
            ELSE 2
        END AS p
    FROM performances
    WHERE user_id = ${user_id}
    ORDER BY y DESC, m DESC, p DESC;
    `;
    return result;
};

const getEfficiencyByPhaseAndSection = async (user_id) => {
    const result = await sql`
        SELECT
            worksection,

            CASE
                WHEN EXTRACT(DAY FROM workdate) <= 15
                THEN DATE_TRUNC('month', workdate)::date
                ELSE (DATE_TRUNC('month', workdate) + INTERVAL '15 days')::date
            END AS phase_start,

            CASE
                WHEN EXTRACT(DAY FROM workdate) <= 15
                THEN (DATE_TRUNC('month', workdate) + INTERVAL '14 days')::date
                ELSE (DATE_TRUNC('month', workdate) + INTERVAL '1 month - 1 day')::date
            END AS phase_end,

            SUM(performance_hours)
                / (SUM(hours_spent) * (7.25 / 8))
                * 100 AS efficiency

        FROM performances
        WHERE user_id = ${user_id}

        GROUP BY worksection, phase_start, phase_end
        ORDER BY phase_start DESC;
    `;

    return result;
};

const getOnePerformance = async (user_id, id) => {
    const result = await sql`
    SELECT *
    FROM performances
    WHERE user_id = ${user_id} AND id = ${id};`;
    return result[0];
};

const addPerformance = async (user_id, worksection, workdate, hours_spent, performance_hours) => {
    const result = await sql`
    INSERT INTO performances (worksection, workdate, hours_spent, performance_hours, user_id)
    VALUES (${worksection}, ${workdate}, ${hours_spent}, ${performance_hours}, ${user_id})
    RETURNING *;`;
    return result[0];
};

const deletePerformance = async (id, user_id) => {
    const result = await sql`
    DELETE
    FROM performances
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;`;
    return result[0];
};

const modifyPerformance = async (id, user_id, new_worksection, new_workdate, new_hours_spent, new_performance_hours) => {
    const result = await sql`
    UPDATE performances
    SET worksection = ${new_worksection}, workdate = ${new_workdate}, hours_spent = ${new_hours_spent}, performance_hours = ${new_performance_hours}
    WHERE id = ${id} AND user_id = ${user_id}
    RETURNING *;`;
    return result[0];
};

export { getAllPerformances, getAllPerformancesOfPhase, getPhases, getEfficiencyByPhaseAndSection, getOnePerformance, addPerformance, deletePerformance, modifyPerformance };
