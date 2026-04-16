import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dialect = process.env.DB_DIALECT || 'sqlite';

const sequelize = dialect === 'sqlite'
  ? new Sequelize({
      dialect: 'sqlite',
      storage: (() => {
        const storagePath = path.join(__dirname, '../../data/smartcampus.sqlite');
        fs.mkdirSync(path.dirname(storagePath), { recursive: true });
        return storagePath;
      })(),
      logging: false,
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      dialect,
      logging: false,
    });

export default sequelize;
