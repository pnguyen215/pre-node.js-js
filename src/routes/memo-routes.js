const commons = require('../commons/commons');
const router = commons.express.Router();

let customService = require('../services/memo-service');
let loggerMiddleware = require('../middleware/memoLoggerMiddleware');

// begin::Define router with: POST, GET, PUT, DELETE here
router.get('/say', customService.saySomething);

router.get('/', customService.saySomething);

router.get('/**', customService.saySomething);



// begin::Define router with: POST, GET, PUT, DELETE here
module.exports = router;

// Latest Best Practices and News
// https://github.com/goldbergyoni/nodebestpractices