const expect = require('chai').expect;
const authMiddleware = require('../middleware/is-auth');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

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


   it('should yield a userId after decoding the token', () => {
      const req = {
         get: function (headerName) {
            return 'Bearer zyx';
         }
      };

      //using stubs
      sinon.stub(jwt, 'verify');
      jwt.verify.returns({ userId: 'abc' }); //register function calls
      //globally replace the verify method
      // jwt.verify = function () {
      //    return { userId: 'abc' }
      // }
      authMiddleware(req, {}, () => { });  //verify called here!
      expect(req).to.have.property('userId');
      expect(req).to.have.property('userId', 'abc');
      expect(jwt.verify.called).to.be.true;
      jwt.verify.restore();
   });


   it('should throw an error if the token cannot be verified', () => {
      const req = {
         get: function () {
            return 'Bearer zyx';
         }
      };
      expect(authMiddleware.bind(this, req, {}, () => { })).to.throw()
   });



});

