const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await prisma.user.findUnique({ where: { google_id: profile.id } });

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        google_id: profile.id,
                        email: profile.emails[0].value,
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        username: `user${Math.floor(Math.random() * 10000)}`,
                        profilePic: profile.photos[0].value
                    }
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }));
};
