const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');


it('should throw an error if not authentication header is present', () => {
   const req = {
      get: function () {
         return null;
      }
   };
   expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated.')

});