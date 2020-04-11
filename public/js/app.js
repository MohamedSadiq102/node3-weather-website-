//const fetch = require('fetch') 
// the mean purpose for this app to be able to fetch the forecast infos 
console.log(' Client side javascript loaded ')


// the call back fun in fetch api is slightly different and then isntead of it, then is part of promieses class, companion async waiting
// fetch allows us to fetch a data from url and do something with it


// here we select the document which we are trying to work with and do this with 
//the next line, similar to css when we select a part like body and so on
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// to run some code when someone submits that form, code is responsible for
// fetching the weather and getting everything rendered correctly, which takes 2 argument
// the first name of the event , second callback func 
/** notice that <script src = "/js/app.js" > </script> should be 
 * at the end of body not in head because  makes error and the page can not render   *  */
weatherForm.addEventListener('submit',(e /* e for event */) =>{
    // to prevent that browser refreshing while we click on search buttom
    e.preventDefault()
    // extract the value from input
    const location = search.value

    messageOne.textContent = ' Loading...';
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
    // it takes only 1 argument and we can use this argument to extract the data from it
    // the callback func will run when the jason data has arrived and been passed
    response.json().then ((data) => {
        if(data.error){
            messageOne.textContent = data.error ;
        }else{
            messageOne.textContent = data.location ;
            messageTwo.textContent = data.forecast ;

        //    console.log(data.location); // this 2 lines if i would like to see  
        //    console.log(data.forecast); // the text in console in developer tools
        }
    })

})

})
