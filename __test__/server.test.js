'use strict';

// import server
const { server } = require('../lib/server.js');

// super goose module for testing
const supergoose = require('@code-fellows/supergoose');

// initiate mongoose for server
const mockRequest = supergoose(server);


// ready to test the routes 
describe('Sony API', () => {

  /////////////////// categories ///////////////////////////////////////////////////////////////////

  
  it('/categories GET request works' , ( ) => {
    return mockRequest
      .get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/categories POST request works with create() method' , ( ) => {
    return mockRequest
      .post('/api/v1/categories')
      .send({ Cars: 'Vision-R' , HeadPhones: 'WH-1000XM3' })
      .then(data => {
        Object.keys([{ Cars: 'Vision-R' , HeadPhones: 'WH-1000XM3' }]).forEach(value => {
          expect(data.body[value]).toEqual({ Cars: 'Vision-R' , HeadPhones: 'WH-1000XM3' }[value]);
        });
      });
  });
  

  it('/categories PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/api/v1/categories/Cars')
      .send( { Cars: 'Vision-S' } )
      .then(data => {
        return mockRequest.put(`/api/v1/categories/Cars/${data.body._id}`)
          .then(data => {
          });
      });
  });


  it('/categories DELETE request works with Delete() method' , ( ) => {
    return mockRequest
      .delete('/api/v1/categories/HeadPhones')
      .then(data => {
        expect(typeof data.body).toBe('object');
        expect(data.status).toBe(200);
         
      });
  });


  ///////////////////// Prodact //////////////////////////////////////////////////////////////////////////////

  it('/products GET request works' , ( ) => {
    return mockRequest
      .get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/products POST request works with create() method' , ( ) => {
    return mockRequest
      .post('/api/v1/products')
      .send([{ Phones: 'xperia 1' , Entertainment: 'Playstation 4' , TV: 'X950G' }])
      .then(data => {
        Object.keys([{ Phones: 'xperia 1' , Entertainment: 'Playstation 4' , TV: 'X950G' }]).forEach(value => {
          expect(data.body[value]).toEqual({ Phones: 'xperia 1' , Entertainment: 'Playstation 4' , TV: 'X950G' }[value]);
        });
      });
  });


  it('/products PUT request works with Update() method' , ( ) => {
    return mockRequest
      .put('/api/v1/products/TV')
      .send( { TV: 'Bravia' } )
      .then(data => {
      });
  });


  it('/products DELETE request works with Delete() method' , ( ) => {
    return mockRequest
      .delete('/api/v1/products/Phones')
      .then(data => {
        expect(typeof data.body).toBe('object');
        expect(data.status).toBe(200);
      });
  });

  ///////////////////////////////////////////////////////////////////////

  it('responds with a 500 on error', () => {
    return mockRequest
      .get('/crash-error')
      .then(results =>{
        expect(results.status).toBe(500);
      })
      .catch(console.error);
  });

  it('if there are not route respond 404', () => {
    return mockRequest
      .get('/not-found')
      .then(results =>{
        expect(results.status).toBe(404);
      })
      .catch(console.error);
  });
});