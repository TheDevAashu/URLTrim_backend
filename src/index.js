import app from "./app.js";
import { connectToDb } from "./db/connectDb.js";
import { PORT } from "./utils/constant.js";

connectToDb().then((res) => {
//   console.log(res);

  app.listen(PORT || 5000, () => {
    console.log(`Server is running on port ${PORT || 5000}`);
  });
});
