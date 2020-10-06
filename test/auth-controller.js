const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../models/user');
const mongoose = require('mongoose');
const AuthController = require('../controllers/auth');


describe('auth controller login process.', () => {

   it('should throw an error code 500 if accessing the database fails', (done) => {

      sinon.stub(User, 'findOne');
      User.findOne.throws();  // !!!

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


   it('should send a response with valid user status for existing user', (done) => {

      const MONGODB_URI = 'mongodb+srv://olive4:hardfloor@nodejs.zzg9t.mongodb.net/test-nodejs_database?retryWrites=true&w=majority'


      mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
         .then(result => {
            const user = new User({
               email: 'test@test.com',
               password: 'tester',
               name: 'Test',
               posts: [],
               _id: '5f79d8bf04810a29d879a1fe'
            })
            return user.save();
         })
         .then(() => {
            const req = { userId: '5f79d8bf04810a29d879a1fe' };
            const res = {
               statusCode: 500,
               userStatus: null,
               status: function (code) {
                  this.statusCode = code;
                  return this;
               },
               json: function (data) {
                  this.userStatus = data.status
               }
            }
            AuthController.getUserStatus(req, res, () => { }).then(() => {
               expect(res.statusCode).to.be.equal(200);
               expect(res.userStatus).to.be.equal('I am new!!');
               done();
            })

         })
         .catch(err => console.log(err));


   });


});
