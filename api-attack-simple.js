const axios = require('axios');

const apiUrl = 'https://api.ok/start'; //api url
const apiKey = 'ok'; // api key
const userId = 'ok'; // api userid

// Mendapatkan argumen dari baris perintah
const [, , target, time, method, requestmethod] = process.argv; // parameter api

function makeApiCall(target, time, method, requestmethod) {
  const params = {
    api_key: apiKey,
    user: userId,
    target: target || '', 
    time: time || '',
    method: method || '',
    requestmethod: requestmethod || '',
  }; // paramter api

  axios.get(apiUrl, { params })
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Memanggil fungsi dengan argumen dari baris perintah
makeApiCall(target, time, method, requestmethod); // response api and parameter api
