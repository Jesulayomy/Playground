const http = require('http');
const fs = require('fs');
const url = require('url');
const figlet = require('figlet');
const querystring = require('querystring');


const firstNames = [
  "RZA",
  "GZA",
  "Ol' Dirty",
  "Inspectah",
  "Raekwon",
  "U-God",
  "Masta",
  "Ghostface",
  "Method",
  "Cappadonna",
  "Shogun",
  "Rebel",
  "Warlord",
  "Divine",
  "Iron",
  "Liquid",
  "Silent",
  "Supreme",
  "Bobby",
  "Golden",
  "Shaolin",
  "Sunz",
  "Street",
  "Dirty",
  "King",
  "Brooklyn",
  "Sha",
  "Chamber",
  "True",
  "Childish",
  "Rugged",
  "Crafty",
  "Silky",
  "Blazing",
  "Dark",
  "Shadow",
  "Mystic",
  "Infinite",
  "Lyrical",
  "Powerful",
  "Staten",
  "Electric",
  "Noble",
  "Justice",
  "Raw",
  "Sun",
  "Wise",
  "Strong",
  "Alpha",
  "Icy",
  "Crimson",
  "Majestic",
  "Jade"
];

const lastNames = [
"Monk",
"Genius",
"Chef",
"Assassin",
"Strategist",
"Warrior",
"Ruler",
"Swordsman",
"Prophet",
"Architect",
"Ninja",
"Scholar",
"King",
"Shaman",
"Poet",
"General",
"Mastermind",
"Alchemist",
"Philosopher",
"Technician",
"Samurai",
"Disciple",
"Sensei",
"Commander",
"Bandit",
"Scientist",
"Villain",
"Destroyer",
"Vortex",
"Prophet",
"Enforcer",
"Teacher",
"Gambino",
"Mystic",
"Conqueror",
"Oracle",
"Nomad",
"Vandal",
"Ronin",
"Outlaw",
"Sage",
"Titan",
"Architect",
"Shadow",
"Crusader",
"Mercenary",
"Panther",
"Hunter",
"Seer",
"Rebel",
"Protector",
"Visionary"
];

function getWuTangClanName(firstName, lastName) {
  let firstIndex = firstName.toLowerCase().charCodeAt(0) - 97;
  firstIndex += firstName.length % 2 ? 0 : 26;
  let lastIndex = lastName.toLowerCase().charCodeAt(0) - 97;
  lastIndex += lastName.length % 2 ? 0 : 26;
  return [firstNames[firstIndex], lastNames[lastIndex]];
}


const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page == '/api/wu-tang-clan') {
    if ('firstName' in params) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      let clanNames = getWuTangClanName(params['firstName'], params['lastName'] || params['firstName']);
      const wuTangFirstName = clanNames[0];
      const  wuTangLastName = clanNames[1];
      res.end(JSON.stringify({
        names: {wuTangFirstName, wuTangLastName}
      }));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        names: null
      }));
    }
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/css/normalize.css') {
    fs.readFile('css/normalize.css', function(err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else if (page == '/img/bg.png') {
    fs.readFile('img/bg.png', function(err, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.writeHead(404, 'Not Found');
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000, () => console.log('Server is Listening on port 8000...'));