/* Contains custom errors that can be thrown. */

class UserNotFound extends Error {
  constructor() {
    super("User not Found");
  }
}

class UserExists extends Error {
  constructor() {
    super("User already Exists");
  }
}

class FailedToCreateUser extends Error {
  constructor() {
    super("Failed to Create User");
  }
}

class InvalidCredentials extends Error {
  constructor() {
    super("Invalid Credentials");
  }
}

class InsufficientCredentials extends Error {
  constructor() {
    super("Insufficient Credentials");
  }
}

module.exports = {
  UserNotFound,
  UserExists,
  FailedToCreateUser,
  InvalidCredentials,
  InsufficientCredentials,
};