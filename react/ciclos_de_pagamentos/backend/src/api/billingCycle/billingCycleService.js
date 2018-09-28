const BillingCycle = require('./billingCycle');


//Metodos utilizados 
BillingCycle.methods(['get', 'post', 'put', 'delete'])
//Como as regras so funciona para os inserts essa linha coloca para update as validações
BillingCycle.updateOptions({ new: true, runValidators: true })


BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})


BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate({
        $project: { credit: { $sum: "$credits.value" }, debt: { $sum: "$debits.value" } }
    }, {
            $group: { _id: null, credit: { $sum: "$credit" }, debt: { $sum: "$debs" } }
        }, {
            $project: { _id: 0, credit: 1, debt: 1 }
        }, (error, result) => {
            if (error) {
                res.status(500).json({ errors: [error] })
            } else {
                res.json(result[0] || { credit: 0, debt: 0 })
            }
        })
})

module.exports = BillingCycle