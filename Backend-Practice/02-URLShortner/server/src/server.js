import { configEnv } from "./config/config.js";
import app from "./app/app.js";
import connectDB from "./config/db.js";

await connectDB()
app.listen(configEnv.PORT, () => {
  console.log(`server is running on PORT ${configEnv.PORT}`);
});
