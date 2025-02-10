require("dotenv").config();
const app = require("./app");
const connectDB = require("./database/dbConnect");

const PORT = process.env.PORT || 3002;
const URL = process.env.CONNECTION_URL;

(async ()=>{
  try {
    await connectDB(URL);
    app.listen(PORT, () => {
      console.log(`application is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

