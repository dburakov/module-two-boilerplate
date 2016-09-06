/* eslint-env mocha */

import { assert } from "chai"
import sinon from "sinon"

import { buildQueryStr, makeRequest } from "core/request"


describe("buildQueryStr", function () {
    const queryParams = {foo: "bar"}

    it("should build query string from object", function() {
        assert.equal(buildQueryStr(queryParams), "?foo=bar")
    })
    
    it("should do something when object is empty", function () {
        assert.equal(buildQueryStr({}), "?")
    })
})

describe("makeRequest", function () {
    beforeEach(function () {
        sinon.stub(window, "fetch")
        window.fetch.returns(
            Promise.resolve({
                json() {
                    return "ok"
                }
            })
        )
    })

    afterEach(function () {
        window.fetch.restore()
    })

    it("should call fetch with an appropriate params", function (done) {
        makeRequest("/test/url").then(
            response => assert.equal(response, "ok")
        ).then(done, done)

        assert.equal(window.fetch.firstCall.args[0], "/test/url")
    })
})
