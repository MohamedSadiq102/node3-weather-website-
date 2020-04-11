const request = require('request'); // request , yargs chalk and so on are npm libarary -> can't do anything that u could do with node anyways just make the things easy

const forecast = (latitude, longitude, callback) => {
  //  const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' 
     const url = 'http://api.weatherstack.com/current?access_key=848bca5ad12b3a9e4533bf5ef60973e7&query=' + latitude + ' , ' + longitude ;
    request({ url, json: true }, (error, { body }) => {
        // here we have tooken the body which is part fron the response
    // and after that we have parses it to jason 
    // we donnt need to parseresponse since we add jason to true 
    //with this way shouldn't parse every time u make request
    //const data = JSON.parse(response.body);

    //if there is error u should handle it. and this error used only for lower user OS things like the
    // complete Lack of a network connection but if the exact thing not found there is no error that's why we need to if else

        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.visibility + '% visibility.');
        }
    })
}

module.exports = forecast