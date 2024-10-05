// const passport = require("passport");
// const OAuth2Strategy = require("passport-google-oauth2").Strategy;
// const bcrypt = require('bcrypt');
// const { PrismaClient } = require('@prisma/client');
// const session = require('express-session');
// const clientID = process.env.GOOGLE_CLIENT_ID
// console.log(clientID)
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET
// const prisma = new PrismaClient();

// passport.serializeUser((user, done) => {
//     done(null, user.user_id);
//   });
  
//   passport.deserializeUser(async (user_id, done) => {
//     try {
//       const user = await prisma.user.findUnique({ where: { user_id } });
//       done(null, user);
//     } catch (error) {
//       done(error, null);
//     }
//   });
// passport.use(
//     new OAuth2Strategy({
//         clientID: clientID,
//         clientSecret: clientSecret,
//         callbackURL: "http://localhost:3000/auth/google/callback",
//         scope: ["profile", "email"]
//     },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await prisma.user.findUnique({ where: { google_id: profile.id } });

//                 if (!user) {
//                     user = await prisma.user.create({
//                         data: {
//                             google_id: profile.id,
//                             email: profile.emails[0].value,
//                             first_name: profile.name.givenName,
//                             last_name: profile.name.familyName,
//                             username: `user${Math.floor(Math.random() * 10000)}`,
//                             profilePic: profile.photos[0].value
//                         }
//                     });
//                 }

//                 return done(null, user)
//             } catch (error) {
//                 return done(error, null)
//             }
//         }
//     )
// )

// module.exports = passport;
