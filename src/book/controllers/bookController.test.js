import booksController from "./bookController";
import bookDao from "../dao/bookDao";

const sinon = require("sinon");
// const bookDao = require('../dao/bookDao');
const expect = require("chai").expect;

describe("Book controller tests:", () => {
  describe("#post()", () => {
    before(() => {
      sinon.stub(bookDao, "saveNewBook").returns({
        then: sinon.stub().returns({ catch: sinon.spy() })
      });
    });

    after(() => {
      bookDao.saveNewBook.restore();
    });

    it("Should not allow an empty title on post", () => {
      const req = {
        body: {
          author: "Sandeep"
        }
      };
      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      const controller = booksController();
      controller.post(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith("Title is required")).to.be.true;
    });
  });
});
