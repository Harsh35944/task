require("dotenv").config();
const connectDB = require("./config");
const app = require("./app");
const { calculatePaymentCron } = require("./cron/calculate-payment.cron");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    calculatePaymentCron();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
})();
