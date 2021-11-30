const WDIOReporter = require('@wdio/reporter').default;

module.exports = class CustomReporter extends WDIOReporter {
  constructor(options) {
    /*
     * make reporter to write to the output stream by default
     */
    options = Object.assign(options, {
      stdout: false
    })
    super(options)
  }

  onTestPass(test) {
    this.write(`Congratulations! Your test "${test.title}" passed\n`)
  }

  testFailed = 0;
  onTestFail() {
    this.testFailed++;
  }

  onRunnerStart() {
    this.write(`==========start test==========\n`)
  }

  onTestStart() {
    this.start = Date.now()
  }

  onTestEnd(test) {
    this.end = Date.now()
    this.write(`Test duration for ${test.title}: ${this.end - this.start}ms\n`)
  }

  onRunnerEnd() {
    this.write(`================================\n`)
    this.write(`Number of test failed: ${this.testFailed}\n`)
    this.write(`============end test============`)
  }
}