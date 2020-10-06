const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../models/user');

const AuthController = require('../controllers/auth');


describe('auth controller login process.', () => {

   it('should throw an error code 500 if accessing the database fails', (done) => {

      sinon.stub(User, 'findOne');
      User.findOne.throws();

      const req = {
         body: {
            email: 'test@test.com',
            password: 'tester'
         }
      }


      AuthController.login(req, {}, () => { }).then(result => {
         // console.log(result);
         expect(result).to.be.an('error')
         expect(result).to.have.property('statusCode', 500)
         //wait until execute
         done()
      })

      User.findOne.restore();

   });

});
