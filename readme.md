[![Build Status](https://travis-ci.org/jiop/nightrambler.com.svg?branch=master)](https://travis-ci.org/jiop/nightrambler.com)

[![Code Climate](https://codeclimate.com/github/jiop/nightrambler.com/badges/gpa.svg)](https://codeclimate.com/github/jiop/nightrambler.com)

[![Test Coverage](https://codeclimate.com/github/jiop/nightrambler.com/badges/coverage.svg)](https://codeclimate.com/github/jiop/nightrambler.com/coverage)

Notes :

Due to a bug in bower foundation-apps package, do not forget to patch manually the foundation-apps. the foundation-apps bower.json needs to contain :

  "main": [
    "dist/css/foundation-apps.css",
    "dist/js/foundation-apps.js",
    "dist/js/foundation-apps-templates.js"
  ],
