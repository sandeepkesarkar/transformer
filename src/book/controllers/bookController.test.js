import booksController from './bookController';
import { logger } from '../../helpers/logHelper';

const sinon = require('sinon');
const bookDao = require('../dao/bookDao');
const expect = require('chai').expect;

describe('Book controller tests:', () => {
  describe('#post()', () => {
    before(() => {
      /* sinon.stub(bookDao, "saveNewBook").callsFake(() => {
        logger.debug("Inside FAKE saveNewBook");
        return sinon.stub.resolves({});
      }); */
      sinon.stub(bookDao, 'saveNewBook').returns({
        then: sinon.stub().returns({ catch: sinon.spy() })
      });
    });

    it('Should not allow an empty title on post', () => {
      // eslint-disable-next-line no-unused-vars
      /* var bookDao = function() {
        this.saveNewBook = () => {
          logger.debug("Inside FAKE saveNewBook");
        };
      }; */
      const req = {
        body: {
          author: 'Sandeep'
        }
      };
      let testFun = () => {
        logger.debug('CALLED testFun stubbed......');
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
        test: testFun
      };
      sinon.spy(res, 'test');
      console.dir(res);
      logger.debug(
        `Inside controller.test post -- Printing res.... ${JSON.stringify(res)}`
      );
      const controller = booksController();
      controller.post(req, res);
      logger.debug(`PRINTING res.test ${res.test}`);
      // logger.debug(`PRINTING res.test.called ${res.test.called}`);
      // console.log(res.status(200));
      // eslint-disable-next-line no-unused-expressions
      expect(res.status.calledWith(400)).to.be.true;
      // expect(res.test.called).to.be.true;

      /* res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`); */

      /* res.send.calledWith("Title is required").should.equal(true); */
    });
  });
});
