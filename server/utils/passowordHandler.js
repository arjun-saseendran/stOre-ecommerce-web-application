import bcrypt, { hash } from "bcrypt";

// for hashing and compare password
export const passwordHandler = async (password, hashedPassword = null) => {
  if (password) {
    bcrypt.hash(password, 10, (error, hash) => {
      if (!err) {
        return hash;
      } else {
        console.log(error);
      }
    });
  } else if (password && hashedPassword) {
    bcrypt.compare(password, hashedPassword, function (error, result) {
      if (!error) {
        return result;
      } else {
        console.log(error);
      }
    });
  }
};
