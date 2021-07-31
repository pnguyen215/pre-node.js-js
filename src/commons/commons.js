'use strict';
/* custom base */
exports.ops = require('os');
exports.dns = require('dns');
exports.networks = require('net');
exports.paths = require('path');
exports.fs = require('fs');
exports.https = require('http');

/* custom libs for API */
exports.express = require('express');
exports.cors = require('cors');
exports.bodyParser = require('body-parser');
exports.logger = require('morgan');
exports.dotenv = require('dotenv');
exports.httpStatus = require('http-status');