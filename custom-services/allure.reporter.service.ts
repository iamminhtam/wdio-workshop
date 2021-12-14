import allure = require('allure-commandline');

export default class AllureService {
  outputDir: string;
  constructor (options) {
    this.outputDir = options.outputDir || __dirname + '/allure-report';
  }

  beforeSession() {
    allure(['generate', '--clean', '--output', this.outputDir]);
  }

  afterSession () {
    const generation = allure(['generate', 'allure-results', '-o', this.outputDir]);
    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout(
        () => reject(new Error('Could not generate Allure report')),
        60000);

      generation.on('exit', function(exitCode) {
        clearTimeout(generationTimeout);
        // eslint-disable-next-line no-console
        console.log('Allure report successfully generated');
        resolve();
      });
    });
  }

  onComplete () {
    allure(["open", this.outputDir]);
  }

}
