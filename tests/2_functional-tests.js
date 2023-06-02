const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suiteTeardown(() => {
    requester.close();
  });

  test('Convert a valid input such as 10L: GET request to /api/convert', (done) => {
    requester
      .get('/api/convert')
      .query({
        input: '10L',
      })
      .end((err, res) => {
        assert.isNull(err, 'err should be null');
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.body.returnNum, 2.64172);
        done();
      });
  });
  test('Convert an invalid input such as 32g: GET request to /api/convert', (done) => {
    requester
      .get('/api/convert')
      .query({
        input: '32g',
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.strictEqual(res.body, 'invalid unit');
        done();
      });
  });
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', (done) => {
    requester
      .get('/api/convert')
      .query({
        input: '3/7.2/4kg',
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.strictEqual(res.body, 'invalid number');
        done();
      });
  });
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', (done) => {
    requester
      .get('/api/convert')
      .query({
        input: '3/7.2/4kilomegagram',
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.strictEqual(res.body, 'invalid number and unit');
        done();
      });
  });
  test('Convert with no number such as kg: GET request to /api/convert', (done) => {
    requester
      .get('/api/convert')
      .query({
        input: 'kg',
      })
      .end((err, res) => {
        assert.notExists(err);
        assert.strictEqual(res.body.returnNum, 2.20462);
        done();
      });
  });
});
