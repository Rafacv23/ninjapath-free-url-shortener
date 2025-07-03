import { isValidUrl } from "../utils/utils"
import { expect, test, describe } from "vitest"

describe("utility functions", () => {
  test("check if a url is valid (not string)", () => {
    expect(isValidUrl("123")).toBe(false)
  })

  test("if the url is valid", () => {
    expect(isValidUrl("https://www.google.com")).toBe(true)
  })

  test("if the url is missing the http protocol", () => {
    expect(isValidUrl("www.google.com")).toBe(false)
  })
})
