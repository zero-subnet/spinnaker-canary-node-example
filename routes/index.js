var express = require('express');
const Prometheus = require('prom-client');
var router = express.Router();

const collectDefaultMetrics = Prometheus.collectDefaultMetrics;

// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/metrics', (req, res, next) => {
    res.set('Content-Type', Prometheus.register.contentType)
    res.end(Prometheus.register.metrics())
})

router.get('/health', function(req, res, next) {
    res.status(200);
    res.send('');
});

module.exports = router;