const bmp = require('build-my-package')

bmp.buildCommonjs({
  entry: './src',
  language: 'typescript',
  tsconfig: {
    skipLibCheck: true
  }
})
