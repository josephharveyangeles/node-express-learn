const express = require('express');
const hbs = require('hbs')
const fs = require('fs')
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})


app.use((req, res, next) => {
  const now = new Date().toString();
  const logString = `${now}: ${req.method} on ${req.url}`
  console.log(logString)
  fs.appendFile('server.log', logString + '\n', (err) => {
    if (err) {
      console.error('Unable to append to server.log');
    }
  });
  next();
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs') // is run in the order of `use()`
// })

app.use(express.static(__dirname + '/public')) 

app.get('/', (req, res) => {
  // res.send('<h1>Hello express</h1>');
  // res.send({
  //   name: 'Joseph Harvey Angeles',
  //   likes: [
  //     'Reading',
  //     'Coding',
  //     'Cat petting',
  //     'Fianceeing'
  //   ]
  // })
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome viewers! To my express app!'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error, bad stuff will happen'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});