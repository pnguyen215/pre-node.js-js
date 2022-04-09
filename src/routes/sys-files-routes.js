const commons = require('../commons/commons');
const router = commons.express.Router();

let sysService = require('../services/sys-service');

router.post('/zip', sysService.zipDirectories);

router.post('/download-zip', sysService.downloadZip);

router.post('/download-resources', sysService.downloadSources);

router.post('/upload', sysService.upload);

module.exports = router;