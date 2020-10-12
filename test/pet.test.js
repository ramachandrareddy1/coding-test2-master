const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pets', () => {
    it('should fail to create a user without a name', async() => {
        const res = await request(app).post('/pets').send({
            name: '',
            age: 16,
            color: 'Green',
        });
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('"firstName" is required');
    });

    it('should create a pet', async() => {
        const pet = {
            name: 'Dog',
            age: 5,
            colour: 'white',
        };
        const res = await request(app).post('/pets').send(pet);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(pet.Dog);
        expect(res.body.age).to.equal(pet.age);
        expect(res.body.colour).to.equal(pet.colour);
    });
    it('Delete a pet based on Name', async() => {
        const petName = 'Dog'
        const res = await request(app).delete('/pets/' + petName);
        expect(res.status).to.equal(201);
    });
});