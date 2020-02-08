const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  let jsonData = JSON.stringify(data);

  console.log(firstName, lastName, email);

  let options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/512b28d287",
    method: "POST",
    headers: {
      Authorization: "kaiafa aef0807ded827d854a141c3f3b4d58b6-us4"
    },
    body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure.html", (req, res) => {
  res.redirect("/");
});
app.post("/success.html", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
