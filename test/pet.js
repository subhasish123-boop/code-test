const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
let Pet = require('../models/pets');
const expect = chai.expect;
let should = chai.should();

chai.use(chaiAsPromised);

describe('/POST pet', () => {
  it('it should not POST a pet without name field', (done) => {
      let pet = {
          age: 3,
          colour: "grey"
      }
      chai.request(app)
        .post('/pets')
        .send(pet)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('errors');
              res.body.errors.should.have.property('name');
              res.body.errors.should.have.property('age');
              res.body.errors.should.have.property('colour');
          done();
        });
  });
  it('it should POST a pet ', (done) => {
      let pet = {
          name: "goldy",
          age: 3,
          colour: "grey"
      }
      chai.request(app)
        .post('/pets')
        .send(pet)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Pet successfully added!');
              res.body.errors.should.have.property('name');
              res.body.errors.should.have.property('age');
              res.body.errors.should.have.property('colour');
          done();
        });
  });
});


describe('/GET/:id pet', () => {
  it('it should GET a pet by the given id', (done) => {
      let pet = new Pet({ name: "Rocky", age: 3, colour: "grey" });
      pet.save((err, pet) => {
          chai.request(app)
          .get('/pets/' + pet.id)
          .send(pet)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('name');
              res.body.should.have.property('age');
              res.body.should.have.property('colour');
              res.body.should.have.property('_id').eql(pet.id);
          done();
        });
      });
  });
});


describe('/DELETE/:id pet', () => {
  it('it should DELETE a pet given the id', (done) => {
      let pet = new Pet({ name: "Rocky", age: 3, colour: "grey" });
      pet.save((err, pet) => {
            chai.request(app)
            .delete('/pets/' + pet.id)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Pet successfully deleted!');
              done();
            });
      });
  });
});