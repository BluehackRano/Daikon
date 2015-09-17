
/*jslint browser: true, node: true */
/*global require, module, describe, it */

"use strict";

var assert = require("assert");
var fs = require('fs');

var daikon = require('../src/main.js');

var buf = fs.readFileSync('./tests/data/jpeg_baseline_8bit.dcm');
var data = new DataView(daikon.Utils.toArrayBuffer(buf));
var image = daikon.Series.parseImage(data);

describe('Daikon', function () {
    describe('test jpeg baseline 8bit', function () {
        it('image size should be 25165824', function () {
            assert.equal(25165824, (image.getRows() * image.getCols() * image.getNumberOfFrames() * (image.getBitsAllocated() / 8)));
        });

        it('pixel bytes compressed size should be 1691672', function (done) {
            assert.equal(1691672, image.getPixelData().value.buffer.byteLength);
            done();
        });

        it('pixel bytes uncompressed size should be 25165824', function (done) {
            image.decompress();
            assert.equal(25165824, image.getPixelData().value.buffer.byteLength);
            done();
        });
    });
});
