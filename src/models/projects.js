import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT
        sp.project_id,
        o.name AS organization_name,
        sp.name AS project_name,
        sp.description AS project_description,
        sp.location,
        sp.start_date,
        sp.end_date,
        sp.status
        FROM public.service_project sp
        JOIN public.organization o
        ON sp.organization_id = o.organization_id
        ORDER BY o.organization_id, sp.project_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

export { getAllProjects }