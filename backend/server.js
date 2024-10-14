require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const database = require("./database/db");
const passportStrategy = require("./passport");
const path = require("path");

const port = process.env.PORT || 5000;
database();

// session setup
const session = require("express-session");

app.use(
	session({
		secret: "somethingsecretgoeshere",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set this to false in development
	}),
);

app.use(passport.initialize());
app.use(passport.session());
// cors setup
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
	}),
);

app.use(express.json());

// for POST requests
app.use("/api/post", require("./routes/POST"));
// for GET requests
app.use("/api/get", require("./routes/GET"));
// for PUT requests
app.use("/api/put", require("./routes/PUT"));
// for authentication
app.use("/auth", require("./routes/AUTH"));

app.use(express.static(path.join(__dirname, "public")));

// starting the server
app.listen(port, () => {
	console.log(`server is running on port: ${port}`);
});
