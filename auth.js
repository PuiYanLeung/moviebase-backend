const bcrypt = require("bcrypt");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/user");
// register
const register = async (email, password, done) => {
//const register = async (name, password, done) => {
  const saltRounds = 10;

  try {
    if (!email) {
    //if (!name) {
      throw new Error("An email was not provided");
      //throw new Error("A name was not provided");
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.build({ email, passwordHash: hash });
    //const user = await User.build({ name, passwordHash: hash });

    try {
      await user.save();
      done(null, user);
    } catch (error) {
      done(null, {});
    }
  } catch (error) {
    done(error);
  }
};
// verify
const verify = async (token, done) => {
  console.log(`inside authenticate.verify`);
  try {
    done(null, token.user);
  } catch (error) {
    done(error);
  }
};

//const login = async (email, password, done) => {
const login = async(username, password, done) =>{
  try {
   const user = await User.findOne({ where: { email: username} });
   //const user = await User.findOne({where:{name: username}});

    if (!user) {
      return done(null, false, { msg: "Incorrect Email" });
      //return done(null, false, {msg:"Incorrect Username"});
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    return match ? done(null, user) : done(null, false, { msg: "Incorrect Password" });

  } catch (error) {
    done(error);
  }
};

const verifyStrategy = new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
  },verify);

const registerStrategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  register
);
//const registerStrategy = new LocalStrategy({usernameField: 'name', passwordField: 'password'}, register);

const loginStrategy = new LocalStrategy(login);

module.exports = {
  registerStrategy,
  verifyStrategy,
  loginStrategy,
};
