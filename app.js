// Фреймворк веб-приложений.
const express = require("express");
const morgan = require("morgan");
const path = require('path');

const app = express();

const PORT = 3000;
// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Подключаем логгирование деталей запросов.
app.use(morgan("dev"));

// Обработка POST запросов.
//распознавания входящего объекта в POST запросе в виде строк или массивов
app.use(express.urlencoded({extended: true}));
// распознавания входящего объекта в POST запросе как объекта JSON
app.use(express.json());

// Подключаем папку public со статическими файлами (картинки, стили и тп)
app.use(express.static(path.join(__dirname, 'public')));

// Отображаем главную страницу с использованием шаблона "index.hbs"
app.get('/', function(req, res) {
    res.render('index', req.query);
});




app.listen(PORT, () => {
  console.log(`server started port ${PORT}`)
})


