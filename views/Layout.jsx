const React = require('react');

module.exports = function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* normalize.css удаляет различия между отображением
        элементов в разных браузерах по умолчанию
        Подробнее: http://necolas.github.com/normalize.css/ */}
        <link rel="stylesheet" href="/css/normalize.css" />

        {/* application.css используется для написания своих стилей */}
        <link rel="stylesheet" href="/css/application.css" />

        <title>Cheering Mascot</title>
      </head>

      <body>
        {children}
      </body>
    </html>
  );
};
