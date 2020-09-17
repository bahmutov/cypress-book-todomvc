// @ts-check
const fs = require('fs')
const path = require('path')
const mdPreprocessor = require('@cypress/fiddle/src/markdown-preprocessor')

// we probably want to copy "canonical" images when
// running on CI only, and not on every user's machine
const isCI = require('is-ci')

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

    if (details.testFailure) {
      // skip screenshots taken on failure
      return
    }
    if (!details.name) {
      console.error('Cannot copy screenshot - it is missing a name!')
      return
    }

    const newPath = path.join(imagesFolder, details.name + '.png')

    // here is a good change to modify the image:
    // add watermarks, text. Maybe even upload the image
    // to an external host rather than keep it in the repo

    // we could also only copy images on CI or for
    // each OS platform separately
    // for example, we might want to copy the image
    // on the user's machine the first time, but not replace an
    // existing screenshot. If you do want to replace the
    // screenshot locally - delete the file from
    // the "images" folder and run the test
    if (fs.existsSync(newPath)) {
      if (!isCI) {
        console.log('skipping overwriting existing image %s', newPath)
        return
      }
    }

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
