const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');


describe('auth middleware', () => {


   it('should throw an error if not authentication header is present', () => {
      const req = {
         get: function () {
            return null;
         }
      };
      expect(authMiddleware.bind(this, req, {}, () => { })).to.throw('Not authenticated.')
   });


   it('should throw an error if the authentication header is only one string', () => {
      const req = {
         get: function () {
            return 'zyx';
         }
      };
      expect(authMiddleware.bind(this, req, {}, () => { })).to.throw()
   });


   it('should throw an error if the token cannot be verified', () => {
      const req = {
         get: function () {
            return 'Bearer zyx';
         }
      };
      expect(authMiddleware.bind(this, req, {}, () => { })).to.throw()
   });


   it('should yield a userId after decoding the token', () => {
      const req = {
         get: function () {
            return 'Bearer zyx';
         }
      };
      authMiddleware(req, {}, () => { });
      expect(req).to.have.property('userId');
   });

});

