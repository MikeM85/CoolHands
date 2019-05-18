/*
FOR BUSINESS QUERIES : https://www.yelp.com/developers/documentation/v3/business_search
FOR REVIEW QUERIES : https://www.yelp.com/developers/documentation/v3/business_reviews
*/

const axios = require("axios");
require("dotenv").config()
const yelp = require('yelp-fusion');
const keys = require('../../config/keys')
//Trouble getting the response to work with an ENV variable so this is what im using for now.""

const client = yelp.client(keys.secrets.YelpAPI_KEY);

module.exports = {
    Query : {
        category: 'Food',
        location: 'austin, tx'
    },
    search: function(query) {
        return client.search(query)
    },
    review: function(id){
        return client.reviews(id)
    },
    autocomp: function(input){
        
        return axios.get("https://api.yelp.com/v3/autocomplete?text="+input.text+"&latitude="+input.lat+"&longitude="+input.lng,{ headers: { Authorization: "Bearer "+keys.secrets.YelpAPI_KEY} } )
    },
    geocode: function(address) {
        
        return axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address.address+"&key="+keys.secrets.GoogleAPI_KEY)
    },
    searchById: function(input) {
        return axios.get("https://api.yelp.com/v3/businesses/"+input.id,{ headers: { Authorization: "Bearer "+keys.secrets.YelpAPI_KEY} } )
    }
};




// const searchQuery = {
//     category: 'Food',
//     location: 'austin, tx'
// }

//change searchQuery to change results; business Id's for reviews stored in response.jsonBody.businesses[n].id
// client.search(searchQuery).then(response => {
//     const firstResult = response.jsonBody.businesses;
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
// }).catch(e => {
//     console.log(e);
// })


