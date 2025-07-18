DROP TABLE IF EXISTS users_housing;

DROP TABLE IF EXISTS task_details;

DROP TABLE IF EXISTS tasks;

DROP TABLE IF EXISTS areas;

DROP TABLE IF EXISTS housing;

DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    surname_2 TEXT,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS housing (
    housing_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS areas (
    area_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    housing_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (housing_id) REFERENCES housing (housing_id)
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    area_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration INTERVAL,
    periodicity INTEGER,
    FOREIGN KEY (area_id) REFERENCES areas (area_id)
);

CREATE TABLE IF NOT EXISTS task_details (
    task_details_id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL, 
    limit_date DATE,
    task_id INTEGER NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY (task_id) REFERENCES tasks (task_id)
); 

CREATE TABLE IF NOT EXISTS users_housing (
    user_id INTEGER NOT NULL,
    housing_id INTEGER NOT NULL,
    is_Admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, housing_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (housing_id) REFERENCES housing (housing_id)
);