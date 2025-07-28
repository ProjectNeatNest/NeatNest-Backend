import { db } from './dbConfig.js';

export function seedDB() {
    db.query(`
      INSERT INTO
         default_areas (name)
      VALUES
         ('Comedor'),
         ('Cocina'),
         ('Baño'),
         ('Salón'),
         ('Aseo'),
         ('Terraza'),
         ('Balcón'),
         ('Jardín') 
   `);
}

seedDB();
