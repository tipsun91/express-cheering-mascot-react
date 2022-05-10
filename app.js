// Подлкючаем babel для поддержки jsx
require('@babel/register');

// Фреймворк веб-приложений.
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Подключаем React и наши views
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const Main = require('./views/Main');

const app = express();

const PORT = 3000;

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
  // создаём React-элемент на основе React-компонента
  const main = React.createElement(Main, req.query);
  // рендерим элемент и получаем HTML (в виде строки)
  const html = ReactDOMServer.renderToStaticMarkup(main);
  // отправляем первую строку нашего HTML-документа
  res.write('<!DOCTYPE html>');
  // отправляем отрендеренный HTML и закрываем соединение
  res.end(html);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
