const pool = require("./pool");

async function getAllInventory() {
  const { rows } = await pool.query(`
SELECT i.price, i.discount, i.available, g.title, g.release_date, g.cover_url, p.name AS platform, d.name AS developer, ARRAY_AGG(c.name ORDER BY c.name) AS categories
FROM inventory AS i
JOIN games AS g ON game_id = g.id
JOIN platforms AS p ON platform_id = p.id
JOIN developers AS d ON developer_id = d.id
LEFT JOIN game_category AS gc ON gc.game_id = g.id
JOIN categories AS c ON gc.category_id = c.id
GROUP BY i.price, i.discount, i.available, g.title, g.release_date, g.cover_url, p.name, d.name;`);
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(`
SELECT DISTINCT name, COUNT(gc.game_id) AS amount
FROM categories AS c
LEFT JOIN game_category AS gc ON c.id = gc.category_id
GROUP by name
ORDER BY amount Desc
`);
  return rows;
}

async function insertNewCategory(category) {
  await pool.query(`INSERT INTO categories (name) VALUES ($1)`, [category]);
}

async function deleteCategory(category) {
  const check = await pool.query(
    `SELECT name FROM game_category AS gc JOIN categories AS c ON gc.category_id = c.id WHERE c.name =$1`,
    [category]
  );

  if (check.rows.length > 0) {
    await pool.query(
      `DELETE FROM game_category WHERE category_id = (SELECT id FROM categories WHERE name = $1)`,
      [category]
    );
  }

  await pool.query(`DELETE FROM categories WHERE name = $1`, [category]);
}

async function editCategory(categoryEdited, categoryToEdit) {
  await pool.query(
    `UPDATE categories
SET name = $1
WHERE name = $2`,
    [categoryEdited, categoryToEdit]
  );
}

module.exports = {
  getAllInventory,
  getAllCategories,
  insertNewCategory,
  deleteCategory,
  editCategory,
};
