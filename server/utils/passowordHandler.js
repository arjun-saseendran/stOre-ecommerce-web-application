import bcrypt from "bcrypt";

// for hashing and compare password
export const passwordHandler = async (password, hashingPassword = "") => {
  try {
    if (hashingPassword === "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } else {
      const matchedPassword = await bcrypt.compare(password, hash);
      return matchedPassword;
    }
  } catch (error) {
    console.log(error);
  }
};
