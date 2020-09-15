// @ts-check
const fs = require('fs')
const path = require('path')
const mdPreprocessor = require('@cypress/fiddle/src/markdown-preprocessor')

const imagesFolder = 'images'
try {
  fs.mkdirSync(imagesFolder)
} catch (e) {}

module.exports = (on, config) => {
  on('file:preprocessor', mdPreprocessor)

  // modify saved screenshots using
  // https://on.cypress.io/after-screenshot-api
  on('after:screenshot', (details) => {
    console.log(details) // print all details to terminal

    const newPath = path.join(imagesFolder, details.name + '.png')

    return new Promise((resolve, reject) => {
      // fs.rename moves the file to the existing directory 'new/path/to'
      // and renames the image to 'screenshot.png'
      fs.rename(details.path, newPath, (err) => {
        if (err) return reject(err)

        // because we renamed and moved the image, resolve with the new path
        // so it is accurate in the test results
        resolve({ path: newPath })
      })
    })
  })
}
