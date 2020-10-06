const expect = require('chai').expect;
const sinon = require('sinon');
const User = require('../models/user');
const mongoose = require('mongoose');
const FeedController = require('../controllers/feed');


describe('feed controller.', () => {

   before((done) => {
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
         .then((res) => {
            done()
         })
   })

   beforeEach(() => { })
   afterEach(() => { })



   it('should add a created post to the posts of the creator', (done) => {


      const req = {
         body: {
            title: 'test post',
            content: 'A Test Post'
         },
         file: {
            path: 'abc'
         },
         userId: '5f79d8bf04810a29d879a1fe'
      }
      const res = { status: function () { return this; }, json: function () { } }

      FeedController.createPost(req, res, () => { }).then((savedUser) => {
         expect(savedUser).to.have.property('posts');
         expect(savedUser.posts).to.have.length(1);
         done();
      })
   });




   after((done) => {
      User.deleteMany({})
         .then(() => {
            return mongoose.disconnect();
         })
         .then(() => {
            done();
         });
   })

})