const elastic=require('elasticsearch');
var client = new elastic.Client({  
  cloud:{
      id:'mri:dXMtZWFzdC0xLmF3cy5mb3VuZC5pbyRjNGIxYWFiNGQ5Yzc0NWM3YmE0MmIyZTA5YzFkYWM5NyQzNGM2YWI2ZmYwYjY0YTY0OWUxMWMxODNjYWE2YzIwOA=='
  },
  auth:{
    username: 'elastic',
    password: 'W0Wy8eKjuqEa9qs4NQcRD0a4'
  }

});
async function run () {
    const result = await client.index({
        index: 'mri',
        body: {
            query: {
              match_all:{
                  
              }
            }
          }
      })
     console.log(result.hits)
    
    }
    run().catch(console.log);
      