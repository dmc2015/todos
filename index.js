const express = require('express')
const parser = require('body-parser');
const methodOverride = require('method-override');
const itemsController = require('./controllers/itemsController')
// const cors = require('cors')
const app = express()


app.set('view engine', 'hbs')

// app.get('/', (req, res) => {
//     console.log('in the root route')
//     res.redirect('/items')
// })





app.use(parser.json({ type: 'application/json' }));
app.use(parser.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

// app.use(cors())
// app.options('*', cors());

app.use('/', itemsController)


app.set('port', process.env.PORT || 3001)
app.listen(app.get('port'), () => {
  console.log(`✅ PORT: ${app.get('port')} 🌟`)
})

// app.listen(PORT, () => {
//     console.log('listening on port 4000')
// })









// const express = require('express')
// const parser = require('body-parser');
// const methodOverride = require('method-override');
// const itemsController = require('./controllers/itemsController')
// const app = express()


// app.set('view engine', 'hbs')

// // app.get('/', (req, res) => {
// //     console.log('in the root route')
// //     res.redirect('/items')
// // })


// app.use(parser.json({ type: 'application/json' }));
// app.use(parser.urlencoded({ extended: true }));

// app.use(methodOverride('_method'));
// app.use(express.static(__dirname + '/public'));



// app.use('/', itemsController)


// app.listen(4000, () => {
//     console.log('listening on port 4000')
// })



