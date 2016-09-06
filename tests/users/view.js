/* eslint-env mocha */

import { assert } from "chai"
import renderFoundAccounts from "users/view"

describe("renderFoundAccounts", function () {
    const users = [
        {
            nickname: "Bob",
            account_id: "123"
        },
        {
            nickname: "Jane",
            account_id: "321"
        }
    ]
    before(function () {
        document.body.innerHTML = renderFoundAccounts(users)
    })

    it("should render table", function () {
        const table = document.querySelector(".js-user-list")
        assert.isOk(table)
        assert.instanceOf(table, HTMLTableElement)
    })

    describe("user rows", function () {
        it("should have users in table", function () {
            const userRows = document.querySelectorAll("tr.js-user")
            assert.lengthOf(userRows, users.length)
        })
    })
})