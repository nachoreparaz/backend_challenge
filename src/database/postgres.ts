import { Sequelize } from "sequelize";
import { CONFIG } from "../utils/config";

export const sequelize = new Sequelize(CONFIG.DB_NAME, CONFIG.DB_USER, CONFIG.DB_PASSWORD, {
  host: CONFIG.DB_HOST,
  dialect: 'postgres',
});

const initPgDb = () => {
  sequelize.authenticate().then(() => {
    console.log('Postgres conected successfuly');
  }).catch((error) => console.log("Error conecting Postgres", error));
}

export default initPgDb;