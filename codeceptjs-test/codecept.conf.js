export const config: CodeceptJS.MainConfig = {
  tests: 'codeceptjs-test',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome'
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'metrics-code-challenge'
}