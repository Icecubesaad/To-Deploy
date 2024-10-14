const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const Seller = require("./models/seller"); // Import the seller model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if a seller with this Google ID already exists
        let seller = await Seller.findOne({ googleId: profile.id });
        const email = profile.emails && profile.emails[0].value;
        let isNewSeller = false;

        if (!seller) {
          // Create a new seller with Google ID and dummy data
          seller = new Seller({
            googleId: profile.id, // Store Google ID
            name: profile.displayName || "Default Seller Name", // Use display name from Google or dummy
            email: email,
            logo: "https://static.vecteezy.com/system/resources/previews/009/118/503/non_2x/pvc-logo-pvc-letter-pvc-letter-logo-design-initials-pvc-logo-linked-with-circle-and-uppercase-monogram-logo-pvc-typography-for-technology-business-and-real-estate-brand-vector.jpg", // Dummy logo URL
            address: "123 Default Street, City, Country", // Dummy address
            mobileNo: "+123456789", // Dummy phone number
            verifiedSupplier: true, // Dummy value
            experience: 5, // Dummy value for years of experience
            onlineStatus: true, // Dummy value for online status
            views: 1000, // Dummy value for views
            rating: 4.5, // Dummy rating
            trustSEAL: true, // Dummy trust seal status
            leadingSupplier: false, // Dummy leading supplier status
            verified: true, // Dummy verified status
            details:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores facilis quibusdam delectus molestiae! Quibusdam odio modi a est praesentium neque nobis, non, fuga sunt excepturi obcaecati minima reiciendis dolorum provident, unde quo expedita. Omnis neque eum odit similique incidunt accusantium earum officia? Voluptas totam corrupti soluta laudantium optio voluptate dolore eum! Minus magni, assumenda aut commodi vero et possimus minima! Culpa, cupiditate quis facere amet accusantium distinctio perferendis ipsam consectetur. Totam laborum quasi ipsum obcaecati reiciendis hic aut distinctio expedita! Vitae mollitia qui numquam, nemo nam, consequatur maiores deserunt quod suscipit enim cum libero sed omnis sequi, saepe aut alias?",
            reviews: [
              {
                name: "saad",
                comment: "Nice",
                rating: 5,
              },
            ],
            banner:
              "https://i.pinimg.com/originals/a3/ed/79/a3ed79ae24bb269982c7b07431aecf51.jpg",
            natureOfBusiness: "Wholesaler",
            numberOfEmployees: 10,
            establishment: 2016,
            legalStatus: "Partnership Firm",
            annualTurnover: 500000,
            workingDays: "Monday To Saturday",
            transactions: 0,
            website: "https://supplier-directory-web-app.vercel.app/Home",
            reponseRate: 0,
            country: "Qatar",
          });

          // Mark the user as new
          isNewSeller = true;

          // Save the seller to MongoDB
          await seller.save();
        }

        // Pass the seller and isNewSeller flag to the done callback
        return done(null, { seller, isNewSeller });
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((userObj, done) => {
  done(null, userObj);
});

passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});
