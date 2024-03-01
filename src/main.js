const core = require('@actions/core')
const httpm = require('@actions/http-client')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const testId = core.getInput('test-id', { required: true })

    // `who-to-greet` input defined in action metadata fil
    if (!process.env['COGNISIM_API_TOKEN']) {
      throw Error(
        'Missing COGNISIM_API_TOKEN get API token from cognisim settings'
      )
    }

    const client = new httpm.HttpClient('cognisim-run-action', [], {
      headers: {
        Authorization: `Bearer ${process.env['COGNISIM_API_TOKEN']}`,
        'Content-Type': 'application/json'
      }
    })

    const url = 'https://device.cognisim.io/execute_test_id'
    const res = await client.postJson(url, { test_id: testId })
    //console.log(res)
    if (res.statusCode !== 200) {
      throw Error(`Failed to run test: ${res.message.statusMessage}`)
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
