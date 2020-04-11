const express = require('express');
const path = require('path')
const hbs = require('hbs') // to use partial u should use hbs
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// store and generate our express application
const app = express();
const port = process.env.PORT || 3000;
// to serve up our app and connect with the html file , for express config
const publicDiretoryPath = path.join(__dirname, '../public')

// to customize the path for folder template which was views before, u should use new path.join() and app.set , for express config
const viewPath = path.join(__dirname, '../templates/views') 

// partials path
const partialPath = path.join(__dirname, '../templates/partials') 


// the set up for handlevares, and we use to make some dynamic templates, indicate to view folder
app.set( 'view engine', 'hbs' ); 
app.set('views', viewPath)

// registerpartial takes the path to ur directory
hbs.registerPartials(partialPath)
// assets "static" not a dynamic web page which mean did not make any change even if i loaded it for 1000 times, general
app.use(express.static( publicDiretoryPath ) );

// in order to connect index.hbs u should make a app.get
app.get(''/** empty for route page */, (req, res)=> {
    // render allows us to render one of our views which use express, engine hbs
    // the first argu is the name of the view and the secound contains all of values which view able to access
    res.render('index', { 
        title: 'Weather App',
        name: 'Moe Sadiq'
    })
})



app.get('/about', (req, res)=> {
    
    res.render('about', { 
        title: 'About App',
        name: 'Moe Sadiq'
    })
})

app.get('/help', (req, res)=> {
    
    res.render('help', { 
        title: 'About page',
        name: 'Moe Sadiq'
    })
})

// the get methode take 2 argument -> first route , 2 res and req
app.get('' , (req, res) => {
// send something to the request
    res.send('<h1> Weather </h1>') 
})


app.get('/weather' , (req, res) => {
    if(!req.query.address){
        return res.send({
            error : ' You must provide a search term'
            
        })
    }
     /* here a dynamic response */
    // geocode takes 2 argument 1-> address , 2 -> callback func which takes 2 arguement -> error and body
    geocode(req.query.address , ( error, { latitude, longitude, location} /* here is an empty object for desturcure which help
         when someone enter an inexist adrress instead of not found will print our json error */ = {}) =>{
        if(error){
            return res.send({error});
        }
        
        // forecast takes 3 argumwnts, latitude , longitude , callback
        forecast(latitude, longitude, (error, forecastData ) => {
            if(error){
                return res.send({error});
            }
            // if everything is goning in the right way 
            res.send({
                forecast: forecastData,
                location, // the shorthand because it has been inialised up abonve
                address: req.query.address
            }) 
        })
        /* here a static response */
        // res.send({
        //     forecast: 'It is snowing ',
        //     location : 'Berlin',
        //     address: req.query.address
        // })
    })
}) 
// section 8 
app.get('/products' , (req, res) => {
    if(!req.query.search){
        return res.send({
            error : ' You ,ust provide a search term'
            
        })
    }
    console.log(req.query.search);
    res.send({
        products : []
        
    })
}) 

// anything after help 
app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Moe Sadiq',
        errorMessage : ' Help article not found'
    })
})

// note that '*' page comes at the end of app.get 
app.get('*' /* the * for everything else */ , (req, res) => {
  //  res.send('My 404 Page')

  res.render('404',{
      title: '404',
      name: 'Moe Sadiq',
      errorMessage : 'Page Not Found'
  })

})

// start up the server with the port num. -> 3000
app.listen(port, /**the callback fuc */ () =>{
// the User wouldn't see this message 
    console.log('Server is up on Port 3000.')
})






// it said my name and direction in my machine
// console.log(__dirname);
// console.log(__filename);