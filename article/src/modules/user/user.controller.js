const userService = require("./user.service");

const userProfile = async (req, res, next) => {
  try {
    const user = await userService.userProfile(req);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const userFollowAndUnFollow = async (req, res, next) => {
  try {
    const message = await userService.userFollowAndUnFollow(req);

    res.status(201).json({
      success: true,
      message: message,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { userProfile, userFollowAndUnFollow };
