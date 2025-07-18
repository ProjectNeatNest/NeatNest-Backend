import { db } from "./dbConfig.js";

export function seedDB() {
   db.query(`
      INSERT INTO 
         users (name, email, password)  
      VALUES 
         ('Juan', 'juan@gmail.com', '123456789'),
         ('Pedro', 'pedro@gmail.com', '123456789'),
         ('Carlos', 'carlos@gmail.com', '123456789'),
   `); 
}

seedDB(); 