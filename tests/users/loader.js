/* eslint-env mocha */

import { assert } from "chai"
import sinon from "sinon"
import mockery from "mockery"

import usersLoader from "users/loader"


describe("usersLoader", function () {
    beforeEach(function () {
        mockery.enable()

        const mock_core_request = {
            makeRequest: function () {
                return sinon.stub()
            }
        };
        mockery.registerMock("buildUrl", buildUrlMock)

        makeRequestMock = {}
        mockery.registerMock("makeRequest", makeRequestMock)
    })

    afterEach(function () {
        mockery.disable()
    })
})