var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

var cookieSession = require('cookie-session')
app.use(cookieSession({
	name: 'session',
	keys: ['my secret password'],
}));

const bcrypt = require('bcrypt');

app.set("view engine", "ejs");

function generateRandomString(keylength) {
  var key = "";
  var characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charLength = characters.length;
  var i;

  for (i = 0; i < keylength; i++) {
    key =
      key + characters.substr(Math.floor(Math.random() * charLength + 1), 1);
  }

  return key;
}

//amy should only see her own urls
function urlsForUser(id) {
  //if amy's userID has any URLs in the DB, show those on the page
  let urlObjects = urlDatabase.filter(function(data) {
    if (data.userID == id) {
      return true; //if iterating through the array, if true, it keeps that element in the array
    } else {
      return false;
    }
  });
  return urlObjects;
}

let urlDatabase = [
  {
    longURL: "http://www.lighthouselabs.ca",
    shortURL: "b2xVn2",
    userID: "userRandomID"
  },
  {
    longURL: "http://www.google.com",
    shortURL: "9sm5xK",
    userID: "user3RandomID"
  },
  {
    longURL: "http://facebook.com",
    shortURL: "PxYaaL",
    userID: "user4RandomID"
  }
];


const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password:'$2b$10$HtzP.eiDHeO/HoKTMi5t3euvh6FduH04ib1G7y70xawppqGEyu6ua'
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password:'$2b$10$Ai/o7qkJyI0AFk9nhPMkq.McLsbBDFIZB0TzT88w6H9rqEmaLsI.C'
  },
  user3RandomID: {
    id: "user3RandomID",
    email: "bob@bob.com",
    password:'$2b$10$wLXsy02GX55H3uthf4kPiuAqR8.jzKdjlRovqATM.2mRbrQTQBs82'
  },
  user4RandomID: {
    id: "user4RandomID",
    email: "amy@amy.com",
    password:'$2b$10$152VBFDgMy/G4E0HrGT0nOjQl2DDLTQnzzUz4qxqqwlVehyowtSVy'
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
    urlDatabase: urlsForUser(req.session["user_id"]),
    // user: req.cookies["username"]
    user: req.session["user_id"],
    users: users
  };

  if (req.session["user_id"]) {
    res.render("urls_index", templateVars);
  } else {
    res.render("urls_unauthorized");
  }
});

app.get("/urls/new", (req, res) => {
  let templateVars = {
    // username: req.cookies["username"]
    user: req.session["user_id"],
    users: users
  };

  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  let longURLs = urlDatabase.filter(function(data) {
    if (data.shortURL == req.params.id) {
      return true;
    } else {
      return false;
    }
  });

  console.log(longURLs);

  let templateVars = {
    shortURL: req.params.id,
    longURL: longURLs[0].longURL,
    user: req.session["user_id"],
    users: users
  };

  if (req.session["user_id"]) {
    res.render("urls_show", templateVars);
  } else {
    res.render("urls_unauthorized");
  }
});

app.get("/u/:shortURL", (req, res) => {
  let longURLs = urlDatabase.filter(function(data) {
    if (data.shortURL == req.params.shortURL) {
      return true; //if iterating through the array, if true, it keeps that element in the array
    } else {
      return false;
    }
  });

  res.redirect(longURLs[0].longURL); //accessing element by index because .filter creates a new array. there is only one element, because when filter, it is checking if shortURL matches the longURL. that's why we indicate [0].
});

app.post("/urls", (req, res) => {
  console.log(req.body);
  // res.send("ok");
  let shortURL = generateRandomString(6);
  let longURL = req.body.longURL;

  let newURL = {
    longURL: longURL,
    shortURL: shortURL,
    userID: req.session["user_id"]
  };

  urlDatabase.push(newURL);
  res.redirect(`/urls/${shortURL}`);
});

app.post("/urls/:id/delete", (req, res) => {
  //when i click delete, it will take the short url and remove that
  console.log("URL Database before deleting:", urlDatabase);

  let i = urlDatabase.findIndex(function(urlObject) {
    return urlObject.shortURL == req.params.id;
  });

  if (req.session["user_id"] == urlDatabase[i].userID) {
    urlDatabase.splice(i, 1);
  }

  //   delete urlDatabase[req.params.id]; //taking the id of whatever is coming through urls/:id/delete (it's the short url. once you delete the key, the value (aka long url) is also deleted.)

  res.redirect(`/urls/`);
});

app.post("/urls/:shortURL/update", (req, res) => {
  console.log(req.body.longURL);
  console.log(req.params.shortURL);
  let longURL = req.body.longURL;

  let i = urlDatabase.findIndex(function(urlObject) {
    return urlObject.shortURL == req.params.shortURL;
  });

  if (req.session["user_id"] == urlDatabase[i].userID) {
    urlDatabase[i].longURL = longURL;
  }

  //   urlDatabase[req.params.shortURL] = longURL;
  res.redirect(`/urls/${req.params.shortURL}`);

  // res.render("/urls/:shortURL/update", templateVars)
});

app.post("/logout", (req, res) => {
  // console.log('Cookies: ', req.cookies);
  req.session = null;
  res.redirect(`urls/`);
});

app.get("/login", (req, res) => {
  res.render(`login`);
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
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
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
    } else {
      //if new, adding a new user into db
      users[randomUserID] = {
        id: randomUserID,
        email: req.body.email,
        password: hashedPassword
      };

      req.session.user_id = randomUserID; //once added, setting the cookie. it's inside the if statement.
    }
  }

  if (email === "" || password === "") {
    res.redirect("/error");
  } else {
    res.redirect("/urls");
  }

  console.log(users);
});

//////////////////////////////////////////////////////////
app.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (email) {
    for (key in users) {
      if (email === users[key].email) {
        foundUser = users[key];
      }
    }

    if (foundUser) {
      if (bcrypt.compareSync(password, hashedPassword)) {
        req.session["user_id"] = foundUser.id;
        res.redirect("/urls");
      } else {
        res.end("<html><body><h1>403 Error</h1></body></html>");
      }
    } else {
      res.end("<html><body><h1>403 Error</h1></body></html>");
    }
  }

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
