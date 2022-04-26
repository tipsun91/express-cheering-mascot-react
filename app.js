// Фреймворк веб-приложений.
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const PORT = 3000;
// Подключаем views (React)
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Подключаем логгирование деталей запросов.
app.use(morgan('dev'));

// Две следующих настройки нужны для того, чтобы мы могли вытащить тело POST-запроса
// Это нужно не всегда (всё зависит от того, как клиент отправляет запросы),
// но пока будем использовать всегда — на всякий случай

// Распознавание входящего объекта в POST-запросе в виде строк или массивов
app.use(express.urlencoded({ extended: true }));
// Распознавание входящего объекта в POST-запросе как объекта JSON
app.use(express.json());

// Подключаем папку public со статическими файлами (картинки, стили и т.д.)
app.use(express.static(path.join(__dirname, 'public')));

// Отображаем главную страницу с использованием компонента "Main"
app.get('/', (req, res) => {
  res.render('Main', req.query);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
