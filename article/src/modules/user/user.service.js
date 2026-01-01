const User = require("./entity/user.entity");
const UserFollow = require("./entity/user-follows.entity");

const userProfile = async (req) => {
  const userId = req.user.userId;

  const findUserProfile = await User.findById(userId);

  if (!findUserProfile) {
    throw { status: 400, message: "User not found." };
  }

  return findUserProfile;
};

const userFollowAndUnFollow = async (req) => {
  const fromUser = req.user.userId;

  const { toUser } = req.body;

  const findFollowUser = await UserFollow.findOneAndDelete({
    toUser,
    fromUser,
  });

  if (findFollowUser) {
    return "User Un-follow.";
  }

  await UserFollow.create({ toUser, fromUser });

  return "User follow successfully.";
};

module.exports = { userProfile, userFollowAndUnFollow };
