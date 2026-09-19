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

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
          project_id,
          organization_id,
          name AS title,
          description,
          location,
          start_date AS date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY start_date;
      `;

    const queryParams = [organizationId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
          sp.project_id,
          sp.name AS title,
          sp.description,
          sp.start_date AS date,
          sp.location,
          sp.organization_id,
          o.name AS organization_name
        FROM service_project sp
        JOIN organization o ON sp.organization_id = o.organization_id
        WHERE sp.start_date >= CURRENT_DATE
        ORDER BY sp.start_date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [number_of_projects]);
    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
          sp.project_id,
          sp.name AS title,
          sp.description,
          sp.start_date as date,
          sp.location,
          sp.organization_id,
          o.name AS organization_name
        FROM service_project sp
        JOIN organization o ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;

    const result = await db.query(query, [id]);
    return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT sp.project_id, sp.name AS title, sp.start_date AS date
        FROM service_project sp
        JOIN service_project_category spc ON sp.project_id = spc.project_id
        WHERE spc.category_id = $1
        ORDER BY sp.start_date;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategoryId };