import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import app from "./app.js";

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

startServer();