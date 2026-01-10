const cron = require("node-cron");
const { Book, Jet } = require("../repository/index");

function calculatePaymentCron() {
  // Runs every minute
  cron.schedule("* * * * *", async () => {
    // 0 0 * * * for every day at midnight
    try {
      console.log("Cron running every minute", new Date());

      const jets = await Jet.aggregate([
        {
          $match: {
            date: { $lt: new Date() },
          },
        },
        {
          $lookup: {
            from: "books",
            let: { jetId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$jetId", "$$jetId"] },
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "userId",
                  foreignField: "_id",
                  as: "user",
                },
              },
              {
                $unwind: {
                  path: "$user",
                  preserveNullAndEmptyArrays: true,
                },
              },
              {
                $project: {
                  _id: 1,
                  bookAmount: 1,
                  "user._id": 1,
                  "user.name": 1,
                  "user.email": 1,
                },
              },
            ],
            as: "books",
          },
        },
        {
          $addFields: {
            bookedCount: { $size: "$books" },
          },
        },
      ]);

      jets.forEach(async (jet) => {
        const bookAmount = Math.floor(jet.tripAmount / (jet.bookedCount + 1));
        console.log("bookAmount===", bookAmount);

        jet.books.forEach(async (book) => {
          let userBookedAmount = Math.floor(book.bookAmount);
          console.log("userBookedAmount===", userBookedAmount);

          if (bookAmount < userBookedAmount) {
            let user = {
              name: book.user.name,
              email: book.user.email,
              bookedAmount: userBookedAmount,
              remainingAmount: userBookedAmount - bookAmount,
            };
            console.log("user===", user);
          }
        });
      });

      console.log("jets", JSON.stringify(jets));
    } catch (error) {
      console.error("Cron Error", error);
    }
  });
}

module.exports = { calculatePaymentCron };
