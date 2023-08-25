# Checkout Team Test

We would like you to complete the following tasks as a technical test.

For both tasks, you can install the required packages with `npm i` and run the tests with `npm test`.

Required steps:

- Clone this repository
- Work on your tasks
- Commit your work locally
- Remove `node_modules`
- Zip `checkout-team-test`
- Upload your zip file to https://wetransfer.com/
- Send the sharable URL to our talent partner

## Task 1

In the [task-1/test/main.test.ts](task-1/test/main.test.ts), you can find a simplified copy of the broken integration
test. Your task is to debug the code and find the bug causing the test to time out.

Expected Outcomes:

- The test should fail on the string comparison but should not time out.

## Task 2

### Part 1

In the [task-2/src/adapters/OrderProvider.ts](task-2/src/adapters/OrderProvider.ts), you can find the `updateOrder`
method that updates the order. In the [task-2/src/schema.ct.d.ts](task-2/src/schema.ct.d.ts), you can find the
definition of the `UpdateAction` interface. In the `updateOrder` method, change the `body` argument type
from `any` to `UpdateAction[]`. Fix affected tests.

### Part 2

In the [task-2/src/adapters/OrderProvider.ts](task-2/src/adapters/OrderProvider.ts), create a second
function, `getOrder`, that calls the same endpoint with the GET method and without the body. Please write appropriate
unit tests in the [task-2/test/adapters/OrderProvider.test.ts] for your new function.
