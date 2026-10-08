import db from './db.js';

const addVolunteer = async (userId, projectId) => {
    const query = `
        INSERT INTO service_project_volunteer (user_id, project_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, project_id) DO NOTHING
        RETURNING project_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

const removeVolunteer = async (userId, projectId) => {
    const query = `
        DELETE FROM service_project_volunteer
        WHERE user_id = $1 AND project_id = $2
        RETURNING project_id;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows.length > 0;
};

const getVolunteerProjectsByUserId = async (userId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.name AS title,
            sp.start_date AS date,
            sp.location
        FROM service_project sp
        JOIN service_project_volunteer spv
            ON sp.project_id = spv.project_id
        WHERE spv.user_id = $1
        ORDER BY sp.start_date, sp.project_id;
    `;

    const result = await db.query(query, [userId]);

    return result.rows;
};

const isUserVolunteering = async (userId, projectId) => {
    const query = `
        SELECT EXISTS (
            SELECT 1
            FROM service_project_volunteer
            WHERE user_id = $1 AND project_id = $2
        ) AS is_volunteering;
    `;

    const result = await db.query(query, [userId, projectId]);

    return result.rows[0].is_volunteering;
};

export {
    addVolunteer,
    removeVolunteer,
    getVolunteerProjectsByUserId,
    isUserVolunteering
};