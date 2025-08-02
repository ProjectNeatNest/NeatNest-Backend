

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

CREATE TABLE IF NOT EXISTS housings (
    housing_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS areas (
    area_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    housing_id INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (housing_id) REFERENCES housings (housing_id)
);

CREATE TABLE IF NOT EXISTS default_areas ( 
    defaultArea_id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    task_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INTEGER,
    area_id INTEGER NOT NULL,
    limit_date DATE,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration INTEGER,
    FOREIGN KEY (area_id) REFERENCES areas (area_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS users_housings (
    user_id INTEGER NOT NULL,
    housing_id INTEGER NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, housing_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (housing_id) REFERENCES housings (housing_id)
);


ALTER TABLE areas DROP CONSTRAINT areas_housing_id_fkey;
ALTER TABLE areas ADD CONSTRAINT areas_housing_id_fkey 
    FOREIGN KEY (housing_id) REFERENCES housings (housing_id) ON DELETE CASCADE;

ALTER TABLE tasks DROP CONSTRAINT tasks_area_id_fkey;
ALTER TABLE tasks ADD CONSTRAINT tasks_area_id_fkey 
    FOREIGN KEY (area_id) REFERENCES areas (area_id) ON DELETE CASCADE;

ALTER TABLE tasks DROP CONSTRAINT tasks_user_id_fkey;
ALTER TABLE tasks ADD CONSTRAINT tasks_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL;

ALTER TABLE users_housings DROP CONSTRAINT users_housings_user_id_fkey;
ALTER TABLE users_housings ADD CONSTRAINT users_housings_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE;

ALTER TABLE users_housings DROP CONSTRAINT users_housings_housing_id_fkey;
ALTER TABLE users_housings ADD CONSTRAINT users_housings_housing_id_fkey 
    FOREIGN KEY (housing_id) REFERENCES housings (housing_id) ON DELETE CASCADE;