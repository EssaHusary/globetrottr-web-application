const UserInfo = require("../Model/userModel");
const errors = require("../errors");

/*
 * AUTHOR(S): Devin
 * RETURNS: a new, unique token
 */
const generateToken = () => {
  return "---" + new Date(Date.now());
};

/*
 * AUTHOR(S): Devin
 * RETURNS: handles a login request
 */
const handleLoginRequest = async (username, password) => {
  // check that username and password are provided
  if (username == null || password == null) {
    throw new errors.InsufficientCredentials();
  }

  const user = await getUserByName(username);

  // if user doesn't exist in database
  if (!user) {
    throw new errors.UserNotFound();
  }

  // if the password given doesn't match with password in database
  if (user.password != password) {
    throw new errors.InvalidCredentials();
  }

  return user;
};

/*
 * AUTHOR(S): Devin
 * RETURNS: handles a signup request
 */
const handleSignupRequest = async (username, password) => {
  // check that username and password are provided
  if (username == null || password == null) {
    throw new errors.InsufficientCredentials();
  }

  // check if user already exists
  const tempUser = await getUserByName(username);
  if (tempUser) {
    throw new errors.UserExists();
  }

  // create the user
  const idOfNewUser = await createUser(username, "", password);

  // check that creation of user was successful
  const newUser = await getUserById(idOfNewUser);
  if (!newUser) {
    throw new errors.FailedToCreateUser();
  }

  return newUser;
};

/*
 * AUTHOR(S): Devin
 * FUNCTION:  Adds a user document to the userInfo collection
 */
const createUser = async (username, userEmail, userPassword) => {
  let newUser = await UserInfo.create({
    username: username,
    password: userPassword,
    token: generateToken(),
    email: userEmail,
    location: null,
    searchHistory: [],
    queryHistory: [],
    userDescription: null,
    schedules: [],
  });
  newUser.save();

  return newUser._id;
};

/*
 * AUTHOR(S): EssaWitDaFatWallet
 * FUNCTION: updates the username of the the user with the given id
 * RETURNS FALSE IF USER WAS NOT FOUND
 */
const updateUsername = async (userId, newUsername) => {
  let user = await getUserById(userId);
  if (!user) {
    return false;
  }

  await UserInfo.updateOne({ _id: user._id }, { $set: { username: newUsername } });
};

/*
 * AUTHOR(S): EssaWitDaFatWallet
 * FUNCTION: updates the email of the the user with the given id
 * RETURNS FALSE IF USER WAS NOT FOUND
 */
const updateUserEmail = async (userId, newEmail) => {
  const user = await UserInfo.findById({ _id: userId });

  if (!user) {
    return false;
  }

  await UserInfo.updateOne({ _id: user._id }, { $set: { email: newEmail } });
  return true;
};

/*
 * AUTHOR(S): EssaWitDaFatWallet
 * FUNCTION: updates the password of the the user with the given id
 * RETURNS FALSE IF USER WAS NOT FOUND
 */
const updateUserPassword = async (userId, newPassword) => {
  let user = await getUserById(userId);
  if (!user) {
    return false;
  }

  await UserInfo.updateOne({ _id: user._id }, { $set: { password: newPassword } });
  return true;
};

/*
 * AUTHOR(S): Devin
 * FUNCTION: updates the username, email. and password of the the user with the 
 *     given id
 * RETURNS FALSE IF USER WAS NOT FOUND
 */
const updateUser = async (userId, username, email, password) => {
  try {
    await updateUsername(userId, username);
    await updateUserEmail(userId, email);
    await updateUserPassword(userId, password);

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

/*
 * AUTHOR(S): Devin
 * RETURNS: user object
 */
const getUserById = async (userId) => {
  let user = await UserInfo.findById({ _id: userId });

  return user;
};

/*
 * AUTHOR(S): Devin
 * FUNCTION: updates the username, email. and password of the the user with the 
 *     given id
 */
const getUserByName = async (username) => {
  let user = await UserInfo.findOne({ username: username });

  return user;
};

const handleUpdateUserDescriptionRequest = async (userId, newUserDescription) => {
  let user = await getUserById(userId);

  if (!user) {
    throw new errors.UserNotFound();
  }

  user.userDescription = newUserDescription;
  user.save();
}

const handleUpdateUserCredentialsRequest = async (userId, username, email, password) => {
  let user = await getUserById(userId);

  if (!user) {
    throw new errors.UserNotFound();
  }

  user.username = username;
  user.email    = email;
  user.password = password;

  user.save();
}

const handleUpdateUserInfoRequest = async (userId, age, gender, aboutMe) => {
  let user = await getUserById(userId)

  if (!user) {
    throw new errors.UserNotFound();
  }

  user.userDescription.age     = age;
  user.userDescription.gender  = gender;
  user.userDescription.aboutMe = aboutMe;
  
  user.save();
}

/* AUTHOR: JUSTIN
 * Takes in the user's object id and grabs the user's searchHistory.
 * Returns the user's searchHistory
*/
const getSearchHistory = async ( user_id ) => {
  return UserInfo.findById({ _id: user_id })
  .then(user => {
    if(!user){
      return false;
    }
    return user.searchHistory;
  })
}

module.exports = {
  handleLoginRequest,
  handleSignupRequest,
  updateUsername,
  updateUserEmail,
  updateUserPassword,
  updateUser,
  handleUpdateUserDescriptionRequest,
  handleUpdateUserCredentialsRequest,
  handleUpdateUserInfoRequest,
  getSearchHistory
};
