import cron from "node-cron";
import User from "../models/User.js";
import { createAlertInDB } from "../controllers/alertController.js";

cron.schedule("0 8 * * *", async () => {
  try {
    const users = await User.find({ isActive: true });
    for (const user of users) {
      await createAlertInDB(
        user._id,
        "routineCheck",
        50,
        "Daily routine health check pending",
        ["email", "sms", "app"]
      );
    }
  } catch (err) {
    console.error("Error in routine alert scheduler:", err);
  }
});
