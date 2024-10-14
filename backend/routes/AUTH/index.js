const router = require("express").Router();
const passport = require("passport");
const seller = require("../../models/seller");
router.get("/login/success", async (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); // Set the frontend origin
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Methods", "GET, POST"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  if (req.user) {
    console.log("user", req.user);
    const current_user = await seller.findOne({ _id: req.user.seller._id });
    if (current_user) {
      console.log("current user : ", current_user);
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: current_user,
      });
    }
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); // Set the frontend origin
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Methods", "GET, POST"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); // Set the frontend origin
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
    res.header("Access-Control-Allow-Methods", "GET, POST"); // Allowed methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
    const { seller, isNewSeller } = req.user;
    
    if (isNewSeller) {
      return res.redirect(`${process.env.CLIENT_URL}/register`);
    } else {
      return res.redirect(`${process.env.CLIENT_URL}/Home`);
    }
  },
);

router.get("/logout", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); // Set the frontend origin
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.header("Access-Control-Allow-Methods", "GET, POST"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next();
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(); // Destroy session
    res.redirect(`${process.env.CLIENT_URL}/Home`); // Redirect to frontend
  });
});

module.exports = router;
