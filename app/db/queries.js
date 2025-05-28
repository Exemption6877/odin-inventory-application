const pool = require("./pool");

async function getAllInventory() {
  const { rows } = await pool.query(`
SELECT i.id, i.price, i.discount, i.available, g.title, g.release_date, g.cover_url, p.name AS platform, d.name AS developer, ARRAY_AGG(c.name ORDER BY c.name) AS categories
FROM inventory AS i
LEFT JOIN games AS g ON game_id = g.id
LEFT JOIN platforms AS p ON platform_id = p.id
LEFT JOIN developers AS d ON developer_id = d.id
LEFT JOIN game_category AS gc ON gc.game_id = g.id
LEFT JOIN categories AS c ON gc.category_id = c.id
GROUP BY i.id, i.price, i.discount, i.available, g.title, g.release_date, g.cover_url, p.name, d.name;`);
  return rows;
}

async function getItemById(id) {
  const { rows } = await pool.query(
    `
SELECT i.id, i.price, i.discount, i.available, g.title, g.developer_id, g.release_date, g.cover_url, platform_id, p.name AS platform, d.name AS developer, ARRAY_AGG(c.id ORDER BY c.id) AS categories_id, ARRAY_AGG(c.name ORDER BY c.name) AS categories
FROM inventory AS i
LEFT JOIN games AS g ON game_id = g.id
LEFT JOIN platforms AS p ON platform_id = p.id
LEFT JOIN developers AS d ON developer_id = d.id
LEFT JOIN game_category AS gc ON gc.game_id = g.id
LEFT JOIN categories AS c ON gc.category_id = c.id
WHERE i.id = $1
GROUP BY i.id, i.price, i.discount, i.available, g.title, g.developer_id, g.release_date, g.cover_url, platform_id, p.name, d.name;`,
    [id]
  );
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(`
SELECT DISTINCT c.id, name, COUNT(gc.game_id) AS amount
FROM categories AS c
LEFT JOIN game_category AS gc ON c.id = gc.category_id
GROUP by c.id,name
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
      `DELETE FROM game_category WHERE category_id IN (SELECT id FROM categories WHERE name = $1)`,
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

async function getAllDevelopers() {
  const { rows } = await pool.query(`SELECT DISTINCT id, name FROM developers`);
  return rows;
}

async function getAllPlatforms() {
  const { rows } = await pool.query(`SELECT DISTINCT id, name FROM platforms`);
  return rows;
}

async function insertNewPlatform(platform) {
  await pool.query(`INSERT INTO platforms (name) VALUES ($1)`, [platform]);
}

async function deletePlatform(platform) {
  const check = await pool.query(
    `SELECT * FROM inventory WHERE platform_id IN (SELECT platforms.id FROM platforms WHERE platforms.name =$1)`,
    [platform]
  );

  if (check.rows.length > 0) {
    await pool.query(
      `UPDATE inventory SET platform_id = NULL
     WHERE platform_id IN (SELECT id FROM platforms WHERE name = $1)`,
      [platform]
    );
  }

  await pool.query(`DELETE FROM platforms WHERE name = $1`, [platform]);
}

async function editPlatform(platformEdited, platformToEdit) {
  await pool.query(`UPDATE platforms SET name = $1 WHERE name = $2`, [
    platformEdited,
    platformToEdit,
  ]);
}

async function insertNewDeveloper(developer) {
  await pool.query(`INSERT INTO developers (name) VALUES ($1)`, [developer]);
}

async function deleteDeveloper(developer) {
  const check = await pool.query(
    `SELECT name FROM games AS g
JOIN developers AS d ON g.developer_id = d.id
WHERE name = $1`,
    [developer]
  );

  if (check.rows.length > 0) {
    await pool.query(
      `
UPDATE games
SET developer_id = NULL
WHERE developer_id IN (
  SELECT id FROM developers WHERE name = $1
);`,
      [developer]
    );
  }

  await pool.query(`DELETE FROM developers WHERE name = $1`, [developer]);
}

async function editDeveloper(developerEdited, developerToEdit) {
  await pool.query(`UPDATE developers SET name = $1 WHERE name = $2`, [
    developerEdited,
    developerToEdit,
  ]);
}

// NEW ENTRIES CODE GOES HERE,
//
//

async function insertNewGame(
  gameTitle,
  releaseDate,
  developerId,
  coverUrl,
  platformId,
  category1,
  category2,
  price,
  discount,
  availability
) {
  const gameIdResult = await pool.query(
    `
INSERT INTO games (title, release_date, developer_id, cover_url)
VALUES ($1, $2, $3, $4)
RETURNING id;`,
    [gameTitle, releaseDate, developerId, coverUrl]
  );

  const gameId = gameIdResult.rows[0].id;
  if (category1 !== null) {
    await pool.query(
      `
    INSERT INTO game_category (game_id, category_id)
VALUES ($1, $2)`,
      [gameId, category1]
    );
  }
  if (category2 !== null) {
    await pool.query(
      `
    INSERT INTO game_category (game_id, category_id)
VALUES ($1, $2)`,
      [gameId, category2]
    );
  }

  await pool.query(
    `INSERT INTO inventory (game_id, platform_id, price, discount, available)
VALUES ($1, $2, $3, $4, $5)`,
    [gameId, platformId, price, discount, availability]
  );
}

module.exports = {
  getAllInventory,
  getItemById,
  getAllCategories,
  insertNewCategory,
  deleteCategory,
  editCategory,
  getAllDevelopers,
  getAllPlatforms,
  insertNewPlatform,
  deletePlatform,
  editPlatform,
  insertNewDeveloper,
  deleteDeveloper,
  editDeveloper,
  insertNewGame,
};
