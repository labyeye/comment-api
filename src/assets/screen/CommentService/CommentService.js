import React from 'react';

const options = {
   method: 'GET',
   url: 'https://jsonplaceholder30.p.rapidapi.com/comments',
   headers: {
     'X-RapidAPI-Key': '661c836913msh77663208816974ap191664jsn5ace149e58a9',
     'X-RapidAPI-Host': 'jsonplaceholder30.p.rapidapi.com'
   }
 };
 
 try {
    const response = await axios.request(options);
    console.log(response.data);
 } catch (error) {
    console.error(error);
 }

useEffect(() => {
 fetchComments();
}, []);

export default options;