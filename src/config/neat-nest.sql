
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS housing;

DROP TABLE IF EXISTS areas;

DROP TABLE IF EXISTS tasks;


CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    surname_2 TEXT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS housing (
    housing_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS areas (
    area_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    -- color TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    area_id INTEGER,
    user_id INTEGER,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    limit_date TEXT,
    duration TEXT,
    is_completed TEXT NOT NULL,
    periodicity INTEGER,

    FOREIGN KEY (area_id) REFERENCES areas (area_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS users_housing (
    user_id INTEGER NOT NULL,
    housing_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    PRIMARY KEY (user_id, housing_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (housing_id) REFERENCES housing (housing_id)
);

CREATE TABLE IF NOT EXISTS housing_areas (
    housing_id INTEGER NOT NULL,
    area_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (housing_id, area_id),
    FOREIGN KEY (housing_id) REFERENCES housing (housing_id),
    FOREIGN KEY (area_id) REFERENCES areas (area_id)
);
