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