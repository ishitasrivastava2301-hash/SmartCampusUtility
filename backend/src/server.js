import app from './app.js';
import sequelize from './config/db.js';
import seed from './utils/seed.js';

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    await seed();

    app.listen(PORT, () => {
      console.log(`Smart Campus backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

start();
