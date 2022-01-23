const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('error', {
        title: 'Ошибка 404'
    });
})

module.exports = router