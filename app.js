const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fn;
  const lastName = req.body.ln;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",

        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us**.api.mailchimp.com/3.0/lists/***********";

  const options = {
    method: "POST",
    auth: "gnanesh:b5a93b88888******629b82263-us11",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
    response.statusCode === 200
      ? res.sendFile(__dirname + "/success.html")
      : res.sendFile(__dirname + "/failure.html");
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
app.post("/success", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT, () => console.log("working"));
