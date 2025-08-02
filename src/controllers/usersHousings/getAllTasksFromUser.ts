import { Request, Response } from 'express';

import { sendQuery } from '../../config/db/dbConfig.js';
import HTTPError from '../../models/HTTPError.js';

export default async function getAllTasksFromUser(req: Request, res: Response) {
    const { user_id, housing_id } = req.params;

    const [userBelongsToHousing] = await sendQuery(
        'SELECT * FROM users_housings WHERE user_id = $1 AND housing_id = $2',
        [user_id, housing_id]
    );

    if (!userBelongsToHousing) throw new HTTPError(404, 'User does not belong to this housing.');

   // Selecciona todas las columnas de la tabla tasks
   // Selecciona la columna name de la tabla areas (renombrandola a area_name, para que en todo lo que devuelve la data no se confunda con el name de la task)
   // Tasks es la tabla base 
   // Se conecta con la tabla areas haciendo un match entre el area_id de la tabla de tasks y la de areas
   // WHERE el user_id de tasks es igual al que me pides, y el housing_id de areas es igual al que me pides
    const userTasks = await sendQuery(
        'SELECT tasks.*, areas.name as area_name FROM tasks JOIN areas ON tasks.area_id = areas.area_id WHERE tasks.user_id = $1 AND areas.housing_id = $2',
        [user_id, housing_id]
    );

    res.send({ message: 'User tasks list', data: userTasks });
}
