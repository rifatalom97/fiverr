const prisma = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
};

const maxAge = 60 * 60 * 24 * 3;

const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;
    const prismaClient = new prisma.PrismaClient();

    if (
      !fullName.length ||
      !username.length ||
      !email.length ||
      !password.length
    ) {
      return res.status(400).json({ error: "FIll out form data" });
    }

    $is_user_by_username = await prismaClient.user.findFirst({
      where: { username },
    });
    $is_user_by_email = await prismaClient.user.findFirst({ where: { email } });

    if ($is_user_by_username) {
      return res.status(400).json({ error: "Username already exists" });
    }
    if ($is_user_by_email) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // now save new user
    const user = await prismaClient.user.create({
      data: {
        fullName,
        username,
        email,
        password: await generatePassword(password),
      },
    });

    if (user) {
      delete user.password;
      res
        .cookie(process.env.COOKIE_NAME, createToken(user.email, user.id), {
          httpOnly: false,
          maxAge: maxAge,
        })
        .status(200)
        .json({ ...user });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  const prismaClient = new prisma.PrismaClient();

  try {
    if (!username.length || !password.length) {
      return res
        .status(400)
        .json({ error: "Username Or Password can't be empty" });
    }

    const user = await prismaClient.user.findFirst({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ error: "Username or password didn't match" });
    }

    // remove password
    delete user.password;

    res
      .cookie(process.env.COOKIE_NAME, createToken(user.email, user.id), {
        httpOnly: false,
        maxAge: maxAge,
        path: "/",
        domain: "localhost",
      })
      .status(200)
      .send({ ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res, next) => {
  res
    .clearCookie(process.env.COOKIE_NAME)
    .status(200)
    .json({ error: "Logout success" });
};

const getUserInfo = async (req, res, next) => {
  try {
    const prismaClient = new prisma.PrismaClient();
    const user = await prismaClient.user.findFirst({
      where: { id: req.userId },
    });

    if (!user) {
      throw new Error("User not found");
    }
    delete user.password;

    res.status(200).send({ ...user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Token based user not found" });
  }
  res.send();
};

module.exports = { signup, login, logout, getUserInfo };
