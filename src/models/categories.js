import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryDetails = async (id) => {
  const query = `
    SELECT category_id, name
    FROM category
    WHERE category_id = $1
  `;
  const result = await db.query(query, [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM category c
    JOIN service_project_category spc ON c.category_id = spc.category_id
    WHERE spc.project_id = $1
    ORDER BY c.name;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO service_project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM service_project_category
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}

const createCategory = async (name) => {
  const query = `
    INSERT INTO category (name)
    VALUES ($1)
    RETURNING category_id;
  `;

  const result = await db.query(query, [name]);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE category
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id;
  `;

  const result = await db.query(query, [name, categoryId]);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  return result.rows[0].category_id;
};

export {
  getAllCategories,
  getCategoryDetails,
  getCategoriesByProjectId,
  updateCategoryAssignments,
  createCategory,
  updateCategory
}