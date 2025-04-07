const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

const ediRoutes = require("./routes/editRoutes")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', ediRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});