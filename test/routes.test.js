require('dotenv').load();

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');
const app = require('../index').app;

chai.use(chaiHTTP);


describe('Routes', function() {


    it('/', function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })

    it('/world', function(done) {

      chai.request(app)
        .get('/world')
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
    })
    //
    it('/category/:category', function(done) {

      chai.request(app)
        .get(`/category/sports`)
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
    })
    //
    describe('Should handle errors', function() {

      it('Has a bad url', function(done){
        chai.request(app)
          .get(`/searc/us`)
            .end(function(err, res) {
              expect(res).to.have.status(404);
              done();
            });
      })
    })

});
