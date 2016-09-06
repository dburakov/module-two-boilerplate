/* eslint-env mocha */

import { assert } from "chai"
import { renderError, renderSpinner } from  "core/view"


describe("renderError", function () {
    const expectedError = {
        error: {
            message: "Error message"
        }
    }

    it("should render custom message", function () {
        document.body.innerHTML = renderError(expectedError)
        const node = document.querySelector(".error")
        assert.equal(node.innerHTML, expectedError.error.message)
    })

    it("should throw error", function () {
        const functionToTest = function(){
            renderError({})
        }
        assert.throws(functionToTest, Error)
    })
})

describe("renderSpinner", function () {
    const domElement = document.createElement("div");

    it("should render spinner", function () {
        renderSpinner(domElement)
        const spinnerEl = domElement.querySelector(".spinner")
        assert.instanceOf(spinnerEl, HTMLDivElement)
    })
})
