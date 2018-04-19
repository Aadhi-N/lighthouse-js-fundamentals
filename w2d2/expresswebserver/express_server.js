var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.set("view engine", "ejs");

function generateRandomString(keylength) {
	var key = "";
	var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var charLength = characters.length;
	var i;

	for (i = 0; i < keylength; i++) {
		key = key + characters.substr(Math.floor((Math.random() * charLength) + 1), 1);
	}

	return key;
}

var urlDatabase = {
 	"b2xVn2": "http://www.lighthouselabs.ca",
 	"9sm5xK": "http://www.google.com",
 	"PxYaaL": "facebook.com"
 };

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  },
  "user3RandomID": {
  	id: "user3RandomID",
  	email: "bob@bob.com",
  	password: "notsecure"
  },
  "user4RandomID": {
  	id: "user4RandomID",
  	email: "amy@amy.com",
  	password: "verysecure"
  }
};

app.get("/", (req, res) => {
	res.end("hello, this is the '/ page!");
});

app.get("/error", (req, res) => {
	res.end("<html><body><h1>400 Bad Request</h1></body></html>");
});

app.get("/urls.json", (req, res) => {
	res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
	 let templateVars = { 
	 	urls: urlDatabase,
	 	// user: req.cookies["username"]
	 	user: req.cookies["user_id"],
	 	users: users
	 };

	res.render("urls_index", templateVars)
});

app.get("/urls/new", (req, res) => {
	let templateVars = { 
	 	// username: req.cookies["username"] 
	 	user: req.cookies["user_id"]

	 };

  res.render("urls_new", templateVars);
});


app.get("/urls/:id", (req, res) => {
	//same thiing as re[params][id]
	let templateVars = {
		shortURL: req.params.id, 
		longURL: urlDatabase[req.params.id],
		// username: req.cookies["username"]
		user: req.cookies["user_id"]
	};
	res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => { //get the short URL, save it to the long
  let longURL = urlDatabase[req.params.shortURL]; 
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
	console.log(req.body);
	// res.send("ok");
	let shortURL = generateRandomString(6);
	let longURL = req.body.longURL;
	//adding to the database:
	urlDatabase[shortURL] = longURL;

	res.redirect(`/urls/${shortURL}`); 
});

app.post("/urls/:id/delete", (req, res) => {
//when i click delete, it will take the short url and remove that
	console.log(urlDatabase);
	delete urlDatabase[req.params.id]; //taking the id of whatever is coming through urls/:id/delete (it's the short url. once you delete the key, the value (aka long url) is also deleted.)

	res.redirect(`/urls/`);

})

app.post("/urls/:shortURL/update", (req, res) => {
	console.log(req.body.longURL);
	console.log(req.params.shortURL)
	let longURL = req.body.longURL;
	urlDatabase[req.params.shortURL] = longURL;
	res.redirect(`/urls/${req.params.shortURL}`);

	// res.render("/urls/:shortURL/update", templateVars)

})


app.post("/logout", (req, res) => {
	// console.log('Cookies: ', req.cookies);
	res.clearCookie("user_id");
	res.redirect(`urls/`);

});

app.get("/login", (req, res) => {
	res.render(`login`)
});

app.get("/hello", (req, res) => {
	res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/register", (req, res) => {
	res.render(`register`);
});

app.post("/register", (req, res) => {
	console.log(req.body);
	let randomUserID = generateRandomString(4);
	let email = req.body.email;
	let password = req.body.password;
	///LONGER WAY OF DOING THIS:
	// users[randomUserID] = {};
	// users[randomUserID].id = randomUserID; 
	// users[randomUserID].email = req.params.email;
	// users[randomUserID].password = req.params.password;


	let userExists = false;

	console.log(email);
	if (email) {
		for (key in users) {
			if (email === users[key].email) {
				userExists = true; ///hoisting this back up to original false value;
			} 
		}
		if (userExists) {
			res.redirect("/error");
		} else { //if new, adding a new user into db
			users[randomUserID] = {
				id: randomUserID,
				email: req.params.email,
				password: req.params.password
			};

			res.cookie("email", email);  //once added, setting the cookie. it's inside the if statement.
		}
	}

	if (email === "" || password === "") {
		res.redirect("/error");
	} else {
		res.redirect("/urls");
	}
});

//////////////////////////////////////////////////////////
app.post("/login", (req, res) => {
	
	let email = req.body.email;
	let password = req.body.password;
	let foundUser = false;

	if (email) {
		for (key in users) {
			if (email === users[key].email) {
				foundUser = users[key];
			}
		}

		if (foundUser) {
				if (password === foundUser.password) {
					res.cookie("user_id", foundUser.id);
					res.redirect("/urls");
				} else {
					res.end("<html><body><h1>403 Error</h1></body></html>")
				}

		} else {
			res.end("<html><body><h1>403 Error</h1></body></html>");
		}
	};
	


	// let username = req.body.username;
	// res.cookie('username', username);
	// res.redirect(`urls/`);
});

app.listen(PORT, () => {
	console.log(`Example app lstening on port ${PORT}!`);
});


// Add a POST route that removes a URL resource: POST /urls/:id/delete

//if username inputted is matched with all existing usernames, and it matches,
//redirect to 400 error