const {cond, eq, lt} = require('..')

const True = () => true
const False = () => false

test('it executes the transformer if the predicate returns true', () => {
  const testCond = cond([[False, () => 'nope'], [True, () => 'yep']])

  const result = testCond(0)

  expect(result).toBe('yep')
})

test('correctly calls the predicate', () => {
  const testCond = cond([
    [x => lt(x, 0), () => 'less than 0'],
    [x => lt(x, 25), () => 'less than 25'],
    [x => lt(x, 50), () => 'less than 50'],
    [x => lt(x, 75), () => 'less than 75'],
    [x => lt(x, 100), () => 'less than 100'],
    [x => eq(x, 100), () => 'is 100'],
    [True, () => 'greater than 100']
  ])

  const lessThan = n => `less than ${n}`

  expect(testCond(-1)).toBe(lessThan(0))
  expect(testCond(0)).toBe(lessThan(25))
  expect(testCond(25)).toBe(lessThan(50))
  expect(testCond(50)).toBe(lessThan(75))
  expect(testCond(75)).toBe(lessThan(100))
  expect(testCond(99)).toBe(lessThan(100))
  expect(testCond(100)).toBe('is 100')
  expect(testCond(101)).toBe('greater than 100')
})

test.skip('it handles multiple argument lengths', () => {})

test('it returns undefined if no catch-all is given', () => {
  const whoops = cond([
    [x => eq(x, 'hi'), () => true],
    [x => eq(x, 'bye'), () => false]
  ])

  expect(whoops('?')).toEqual(undefined)
})