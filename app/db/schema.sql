-- Database creation

CREATE DATABASE game_store;

CREATE TABLE categories (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE developers (
id SERIAL PRIMARY KEY,
name VARCHAR(100)
);

CREATE TABLE platforms (
id SERIAL PRIMARY KEY,
name VARCHAR(50)
);

CREATE TABLE games (
id SERIAL PRIMARY KEY,
title VARCHAR(100),
release_date DATE,
developer_id INTEGER REFERENCES developers(id),
cover_url TEXT
);

CREATE TABLE game_category (
id SERIAL PRIMARY KEY,
game_id INTEGER REFERENCES games(id),
category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE inventory (
id SERIAL PRIMARY KEY,
game_id INTEGER REFERENCES games(id),
platform_id INTEGER REFERENCES platforms(id),
price INTEGER,
discount INTEGER,
available BOOLEAN
);

-- Insert default items

INSERT INTO platforms (name)
VALUES
  ('XBOX'),
  ('PlayStation'),
  ('Nintendo Switch'),
  ('PC');


INSERT INTO categories (name)
VALUES
  ('Shooter'),
  ('Sandbox'),
  ('Strategy'),
  ('Adventure');


INSERT INTO developers(name)
VALUES
  ('Treyarch'),
  ('Mojang'),
  ('Paradox Development Studio');


INSERT INTO games(title, release_date, developer_id, cover_url)
VALUES
  ('Minecraft', '2009-05-17', 2, '/covers/minecraft.png'),
  ('Hearts of Iron IV', '2016-06-06', 3, '/covers/hoi4.png'),
  ('Call of Duty: BO6', '2025-10-20', 1, '/covers/bo6.png');


INSERT INTO game_category (game_id, category_id)
VALUES
  (1, 2),
  (1, 4),
  (2, 3),
  (3, 1),
  (3, 4);  

INSERT INTO inventory (game_id, platform_id, price, discount, available)
VALUES
  (1, 1, 30, 10, TRUE),
  (1, 4, 27, 0, TRUE),
  
  (2, 4, 40, 20, TRUE),

  (3, 1, 60, 5, TRUE),
  (3, 2, 60, 10, FALSE),
  (3, 4, 55, 15, TRUE);
