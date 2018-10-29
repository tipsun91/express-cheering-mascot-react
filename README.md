# Cheering Mascot (Талисман команды, подбадривающий игроков) 

## Общие сведения

Мы создадим очень простое веб-приложение с помощью
 [Sinatra](http://www.sinatrarb.com/documentation.html), упрощенной платформы для создания веб-приложений в Ruby.  Мы будем изучать, как передавать данные при выполнении HTTP-запросов, а также как получить доступ к данным, которые были переданы с запросом. Мы рассмотрим запросы `GET` и `POST`.

### Модуль подбадривающего талисмана
Такая задача представляет собой веб-версию задачи построения в Ruby командной строки для Талисмана команды, подбадривающего игроков. В случае, если кто-либо не знаком с выполнением данной задачи или ему/ей необходимо вспомнить, вот обзор.

| CHEER NAME      | SIGN TEXT      |
| :-------------: | :------------: |
| RED HOT         | H-O-T!         |
| DO IT AGAIN     | Go, Fight, Win |
| 2 BITS          | Holler!        |
| STOMP YOUR FEET | STOMP!         |

/Перевод:
| НАЗВАНИЕ ПРИВЕТСТВИЯ      | ТЕКСТ ЗНАКА      |
| :-------------: | :------------: |
| ЯРКО-КРАСНЫЙ         | H-O-T!         |
| СДЕЛАТЬ ЕЩЕ РАЗ     | Идите, Боритесь, Побеждайте |
| 2 РАЗА          | Крик!        |
| ТОПАЙТЕ НОГАМИ | ТОПОТ!         |

  *Таблица 1*.  Подбадривающие приветствия, для которых у талисмана есть знаки.

Мы задаем какие-то подбадривающие приветствия, и у нас есть талисман, помогающий нам, удерживая знаки, соответствующие нашим подбадривающим приветствиям. У талисмана есть только знаки для нескольких подбадривающих приветствий. Талисман будет удерживать соответствующий знак, если мы закричим название приветствия, которое хотим услышать (т.е. все, напечатанные заглавными буквами). Но, если мы выкрикнем приветствие, для которого у талисмана нет знака, или если мы не выкрикнем имя приветствия достаточно громкого для того, чтобы талисман услышал, то талисман будет держать общий знак "Go Team!" (Команда, вперед!).

Модуль `Mascot` (подбадривающего талисмана) предоставлен (см. `app/models/mascot.rb`).  Целью модуля является определение знака, который будет держать талисман, исходя из названия заданного подбадривающего приветствия. 

### Общая схема алгоритма программы Sinatra 
Структура папок этой задачи была разработана для имитации структуры приложения Rails. В DBC Синатра бросает вызов всем схожим схемам алгоритма, поэтому стоит обратить внимание на то, как она организована.

Особенно примечателен каталог `app`. Большинство файлов, с которыми мы будем работать, будут храниться в его подпапках.


- `app/controllers` содержит файлы, в которых мы определяем, как наше приложение будет отвечать на различные запросы HTTP.
 
- `app/helpers` содержит файлы, в которых мы определяем методы, соответствующие нашим взглядам и разделяемые нашими контроллерами. Мы не будем определять никакие из них в данной задаче.

- `app/models` содержит файлы, в которых мы определяем классы и модули, используемые в нашем приложении.

- `app/views` содержит файлы, в которых мы определяем шаблоны, которые мы преобразуем в HTML, и отправляем обратно в качестве ответов на запросы HTTP.

### База данных PostgreSQL 
Мы не будем создавать базу данных для этой задачи. Однако стоит отметить, что схема алгоритма программы Sinatra использует для своей базы данных [Postgres] (http://www.postgresql.org/), а не для SQLite. Если по какой-то причине существует ошибка, связанная с базой данных, обратитесь к инструктору, чтобы убедиться, что конфигурация машины настроена правильно, и Postgres работает. 


## Releases
### Пререлиз: Запуск сервера с помощью Shotgun
Чтобы использовать наше приложение, нам нужно запустить сервер для обработки HTTP-запросов, которые мы будем генерировать в браузере. Взгляните на `Gemfile` (файл `Gem`). Обратите внимание на две записи: [`thin`] (https://github.com/macournoyer/thin/) и [`shotgun`] (https://github.com/rtomayko/shotgun). Мы не обязаны знать, как они работают. Достаточно сказать, что у нас будет «тонкий» сервер, и мы запустим его с помощью Shotgun.

Прежде чем попытаться запустить сервер, давайте удостоверимся, что все необходимые файлы gem установлены. Запустите `bundle`, чтобы установить недостающие файлы gem.

Чтобы запустить сервер, выполните следующую команду из корневого каталога приложения:

```
```
*Рисунок 1*.  Код для запуска сервера.

Файл `config.ru` загружает нашу среду и запускает наше приложение. `.ru` означает "увеличивать, наращивать". Sinatra, как и Rails, является рамочной программой [основанной на приложении Rack] (http://rack.github.com/), что означает, что основной точкой входа является этот файл `config.ru`. Двигаясь вперед, мы можем бросить `config.ru` и просто запустить `bundle exec shotgun`. По умолчанию `shotgun` ищет файл `config.ru` в текущем каталоге.
```
```
*Рисунок 2*. Консольный вывод после запуска сервера.

Когда сервер запускается, мы должны увидеть результат, аналогичный показанному на рисунке 2. Первая и последняя строки содержат наиболее релевантную информацию. Первая строка дает нам хост и порт, где мы можем получить доступ к нашему приложению: `http: //127.0.0.1: 9393 /`. Последняя строка сообщает нам, как завершить работу нашего сервера: `CTRL + C`.

### Release 0: Зайти на главную страницу

!

*Рисунок 3*.  Скриншот главной страницы.

Теперь мы можем зайти в наше веб-приложение. Вместо использования хоста `127.0.0.1`, мы можем использовать` localhost`, который всегда ссылается на * текущий компьютер *. Откройте браузер и перейдите на страницу http: // localhost: 9393. Наша страница должна выглядеть примерно так, как показано на рисунке 3.

Итак, что здесь происходит? Когда мы перешли на http://localhost: 9393, браузер отправил HTTP-запрос на сервер, который мы запустили. Более конкретно, он сделал запрос `GET` к корневому URL.

```
```
Рисунок 4.  Определение обработчика GET в Sinatra.

Наш сервер, очевидно, знал, как обрабатывать этот запрос. Давайте посмотрим на файл `app/controllerlers/index.rb`. В верхней части файла мы увидим код, который показан на рисунке 4, который определяет обработчик `GET`, вызывая метод [`Sinatra::Base # get`] (https://github.com/sinatra/sinatra/blob/master/lib/sinatra/base.rb#L136). Мы передаем методу путь, который в этом случае `"/"`, и представляет собой корневой URL. Мы также передаем блок. В общем, мы говорим, что когда запрос `GET` делается на этот конкретный путь, выполните данный блок кода. 

Что делает блок кода? Сначала он присваивает переменную экземпляра `@ sign_text`. Мы поговорим об этом в следующем release (выпуске). Тогда у нас есть строка `erb: index`. Мы вызываем метод [`Sinatra::Templates # erb`] (https://github.com/sinatra/sinatra/blob/master/lib/sinatra/base.rb#L665) и передаем имя шаблона, который мы хотим отобразить.

Символ `:index`, который мы передаем, соответствует названию одного из наших шаблонов представления:`app/views/index.erb`. Наш шаблон написан во встроенном Ruby. По сути, наш шаблон представляет собой обычный текст со смещенными фрагментами кода Ruby. Когда шаблон отображается, выражения Ruby получают оценку, а их возвращаемые значения заменяют фрагменты.

Вернемся к нашему блоку кода. Вызов `#erb` отображает наш шаблон в строку. Поскольку это последняя строка кода для выполнения, отображаемая строка - это то, что наш блок вернется. И возвращаемое значение блока становится телом ответа, который наш сервер отправит обратно в браузер.


### Release 1: Пишем слова на Знаке

На знаке, который держит наш талисман, нужно написать несколько слов. Мы хотим, чтобы текст знака был динамичным. Помните, мы собираемся выкрикивать ура, и наше приложение определит соответствующий знак.

Мы начнем с рассмотрения того, как передавать данные при создании `GET`-запроса. Мы собираемся использовать [query string], то есть, [строку запроса] (http://en.wikipedia.org/wiki/Query_string). Проще говоря, мы добавим некоторые данные в конец нашего URL.

```
```
*Рисунок 5*. Пример URL с добавленной строкой запроса.

Строка запроса смещается от остальной части URL с помощью `?`. После того, как `?` станет парами «ключ-значение»; пары разделяются символом `&`. Каждая пара «ключ-значение» - это отдельный параметр строки запроса. В строке запроса на рисунке 5 мы передаем данные с именем Ariel и фамилией Cyrillus.

!

*Рисунок 6*. Скриншот главной страницы с текстом `sign_text=LOUDER`, переданным в строке запроса.

Мы будем использовать ту же технику, чтобы управлять словами, которые появляются на знаке нашего талисмана. Мы добавим пару ключевых значений в нашу строку запроса. Ключ должен быть `sign_text`. Давайте дадим ключу значение `LOUDER` (ГРОМЧЕ). В браузере перейдем к `http: // localhost: 9393 /? Sign_text = LOUDER`. Теперь на знаке должен быть текст (см. Рис. 6).

Как значение из строки запроса попало на веб-страницу? Нам нужно взглянуть на пару файлов: `app/controllerlers/index.rb`, которые мы уже видели, и на `app/views/index.erb`.

В Release 0 мы обсудили обработчик `GET`, который мы определили для запросов, внесенных в корневой путь нашего приложения. В блоке, который выполняется, когда `GET`-запрос делается на корневой путь (см. Рис. 4), нам еще предстоит обсудить строку `@sign_text = params [: sign_text]`.

```
```
*Рисунок 7*. Представление хэша `params`.

Когда HTTP-запросы поступают на наш сервер, становятся доступными параметры строки запроса. Пары «ключ-значение» добавляются к хешу, присвоенному переменной `params`. В нашем примере, у хэша `params` ключ`: sign_text`. Значение этого ключа - это строка `LOUDER`. (См. Рис. 7) 

У нас есть доступ к данным, переданным в строке запроса, но что мы делаем с ними? Мы обращаемся к значению ключа `sign_text` хэша `params` (то есть, `LOUDER`) и присваиваем это значение переменной экземпляра `@ sign_text`.

```
```
*Рисунок 8*. Фрагмент кода из `app/views/index.erb`.

Когда мы назначаем переменную экземпляра в блоке, эта переменная экземпляра доступна при создании шаблона. В нашем примере мы создаем шаблон, написанный в `app/views/index.erb` (см. Рис. 8). В нашем шаблоне мы вставляем какой-либо код Ruby, чтобы сказать, является ли переменная экземпляра `@ sign_text` правильной, при создании шаблона включите следующий код:` <span> <% = @sign_text%> </ span>`. Разумеется, нужно будет оценить фрагмент Ruby `<% = @sign_text%>`. В этом примере наш созданный шаблон будет включать `<span> LOUDER </ span>`.


### Release 2:  Используйте форму, чтобы выкрикивать подбадривающие приветствия

Теперь пришло время выкрикивать подбадривающие приветствия. Помните, мы хотим указать название приветствия, и наше приложение определит, какой знак будет держать талисман. 

Мы будем использовать форму для отправки названия подбадривающего приветствия. В `app/views/index.erb` мы определяем форму, а также мы даем форму некоторым атрибутам. У формы есть `метод`, который представлен посредством `post` и `action`, который установлен на `"/cheers"`. Эти атрибуты объединяются, чтобы определить, что происходит при отправке формы. Отправка этой формы подскажет браузеру сделать запрос `POST` на путь `/cheers`.

Когда форма отправляется, данные, введенные в форму, отправляются как часть запроса. Поля ввода и их значения объединяются для формирования строки текста, форматированной как строка запроса, которая добавляется в тело запроса. Каждый атрибут `name` элемента `input` используется как ключ. Значение для каждой клавиши - это то, что было введено в форму. Эти пары «ключ-значение» добавляются к хэшу `params` и доступны в наших обработчиках запросов.

Обработчик запросов `POST` для пути `/cheers` был определен для нас в `app/controllerlers/index.rb`. Введите название подбадривающего приветствия в форму, отправьте форму и посмотрите на ответ, отображаемый в браузере.

К сожалению, обработчик не обрабатывает запрос так, как мы хотим. Нам необходимо сделать следующее, чтобы переписать обработчик. 

1. Узнайте, какое название подбадривающего приветствия было отправлено с формой.
2. Определите, какой знак должен держать талисман исходя из названия приветствия. Помните, что эта работа может быть делегирована модулю `Mascot` (подбадривающего талисмана).
3. Перенаправить браузер на главную страницу, добавив строку запроса, содержащую текст для отображения на знаке. Когда форма отправлена, браузер должен в конечном итоге оказаться в http: // localhost: 9393 /? Sign_text = foobar`, где `foobar` - любой текст, который должен появиться на знаке. Для ознакомления прочитайте документацию Sinatra в [browser redirect][] (переадресации браузера).


## Заключение
Мы совершили беглый тур по HTTP и Sinatra: как обращаться с запросами `GET` и` POST`, как передавать данные с помощью запроса `GET`, как данные в форме отправляются как часть` POST`-запроса, как получить доступ к данным, отправленным с запросом через хэш `params`, как определить обработчик запросов Sinatra и т.д. От такого объема информации голова идет кругом. К счастью, мы собираемся много работать с Sinatra для создания веб-приложений, и мы будем все более и более комфортно себя чувствовать в работе со всеми этими материалами.

Вот некоторые материалы для чтения и справки о Sinatra.




_________________________________________________________________________________________________________

# Cheering Mascot

## Summary

We're going to build a very simple web application using [Sinatra](http://www.sinatrarb.com/documentation.html), a lightweight framework for building web applications in Ruby.  We'll be exploring both how to pass data when making HTTP requests and also how to access data that's been passed with a request.  We'll take a look at both `GET` and `POST` requests.

### Mascot Module
This challenge is a web version of the Cheering Mascot Ruby command line challenge.  In case anyone is unfamiliar with that challenge or needs a refresher, here's an overview.

| CHEER NAME      | SIGN TEXT      |
| :-------------: | :------------: |
| RED HOT         | H-O-T!         |
| DO IT AGAIN     | Go, Fight, Win |
| 2 BITS          | Holler!        |
| STOMP YOUR FEET | STOMP!         |

  *Table 1*.  Cheers for which the mascot has signs.

We are leading some cheers, and we have a mascot helping us by holding up signs that correspond to our cheers.  The mascot only has signs for a handful of cheers.  The mascot will hold up the appropriate sign, if we shout the name of the cheer we want to hear (i.e., type with all caps).  But, if we call out a cheer for which the mascot has no sign or if we don't shout out the name of the cheer loud enough for the mascot to hear, the mascot holds up a generic "Go Team!" sign.

A `Mascot` module has been provided (see `app/models/mascot.rb`).  The purpose of the module is to determine the sign to hold based on the name of a given cheer.

### Sinatra Skeleton
The folder structure of this challenge has been designed to mimic the structure of a Rails application.  At DBC, the Sinatra challenges all share a similar skeleton, so it's worth taking a moment to orient ourselves to how it's organized.

Particularly noteworthy is the `app` directory.  Most of the files we'll be working with will be stored in its subfolders.

- `app/controllers` contains the files where we define how our application will respond to various HTTP requests.

- `app/helpers` contains the files where we define methods shared by our controllers and views.  We won't be defining any in this challenge.

- `app/models` contains the files where we define the classes and modules used in our application.

- `app/views` contains the files where we define templates that we'll convert to HTML and send back as responses to HTTP requests.

### PostgreSQL Database
We won't be creating a database for this challenge.  However, it's worth noting that the Sinatra skeleton uses [Postgres](http://www.postgresql.org/) for its database, not SQLite.  If for some reason there's a database-related error, grab an instructor to make sure the machine is configured correctly and Postgres is running.


## Releases
### Pre-release: Starting the Server with Shotgun
In order to use our application, we need to run a server to handle the HTTP requests we'll be generating in the browser.  Take a look at the `Gemfile`.  Notice two of the entries:  [`thin`](https://github.com/macournoyer/thin/) and [`shotgun`](https://github.com/rtomayko/shotgun).  We're not expected to know how these work. Suffice it to say we'll be running a thin server, and we'll start it with shotgun.

Before we try starting the server, let's make sure that all required gems have been installed. Run `bundle` to install any missing gems.

To start the server, run the following command from the application's root directory:

```text
$ bundle exec shotgun config.ru
```
*Figure 1*.  Code to start server.

The `config.ru` file loads our environment and runs our application. The `.ru` stands for "rackup". Sinatra, like Rails, is a [Rack-based](http://rack.github.com/) framework, which means the main point of entry is this `config.ru` file. Going forward, we can leave off the `config.ru` and just run `bundle exec shotgun`.  By default, `shotgun` looks for a `config.ru` file in the current directory.

```text
== Shotgun/Thin on http://127.0.0.1:9393/
Thin web server (v1.6.2 codename Doc Brown)
Maximum connections set to 1024
Listening on 127.0.0.1:9393, CTRL+C to stop
```
*Figure 2*. Console output after starting the server.

When the server starts we should see output similar to that in Figure 2.  The first and last lines contain the most relevant information.  The first line gives us the host and port where we can access our application:  `http://127.0.0.1:9393/`.  The last line informs us how to shut down our server:  `CTRL + C`.

### Release 0: Visit the Homepage

![screenshot-no-text](screenshot-no-text.png)

*Figure 3*.  Screenshot of homepage.

We should now be able to visit our web app. Rather than using host `127.0.0.1`, we can use `localhost` which always refers to *the current machine*.  Open the browser and go to `http://localhost:9393`.  Our page should look similar to the screenshot in Figure 3.

So, what's happening here?  When we went to `http://localhost:9393`, the browser sent an HTTP request to the server that we started.  More specifically, it made a `GET` request to the root URL.

```ruby
get '/' do
  @sign_text = params[:sign_text]
  # Look in app/views/index.erb
  erb :index
end
```
Figure 4.  Defining a Sinatra GET handler.

Our server obviously knew how to handle that request.  Let's take a look at the file `app/controllers/index.rb`.  At the top of the file, we'll see the code that appears in Figure 4, which defines a `GET` handler by calling the method [`Sinatra::Base#get`](https://github.com/sinatra/sinatra/blob/master/lib/sinatra/base.rb#L1368).  We're passing the method a path, which is in this case `"/"` and represents the root URL.  We also pass a block.  All together, we're saying that when a `GET` request is made to this specific path, execute this block of code.

What does the block of code do?  First it assigns an instance variable `@sign_text`.  We'll talk more about this in the next release.  Then, we have the line `erb :index`.  We're calling the method [`Sinatra::Templates#erb`](https://github.com/sinatra/sinatra/blob/master/lib/sinatra/base.rb#L665) and passing the name of a template that we want to render.

The symbol `:index` that we're passing corresponds to the name of one of our view templates:  `app/views/index.erb`.  Our template is written in embedded Ruby.  Essentially, our template is plain text with snippets of Ruby code mixed in.  When the template is rendered, the Ruby expressions get evaluated and their return values replace the snippets.

Back to our block of code.  The call to `#erb` renders our template into a string. As this is the last line of code to execute, the rendered string is what our block will return.  And, the return value of the block becomes the body of the response that our server will send back to the browser.


### Release 1: Put Words on the Sign

The sign our mascot is holding needs some words on it.  We want the text of the sign to be dynamic.  Remember, we're going to call out cheers, and our application will determine the appropriate sign.

We'll begin by looking at how to pass data when making a `GET` request.  We're going to use a [query string](http://en.wikipedia.org/wiki/Query_string).  To put it simply, we're going to add some data to the end of our URL.

```text
http://somesite.com/?first_name=Ariel&last_name=Cyrillus
```
*Figure 5*. Example URL with a query string added.

A query string is offset from the rest of the URL by a `?`.  After the `?` are key-value pairs; pairs are delimited with an `&`.  Each key-value pair is an individual query string parameter.  In the query string in Figure 5, we're passing along data for a first name, Ariel, and a last name, Cyrillus.

![screenshot with text](screenshot-with-text.png)

*Figure 6*. Screenshot of homepage with `sign_text=LOUDER` passed in the query string.

We're going to use the same technique to control the words that appear on our mascot's sign.  We'll add a key-value pair to our query string.  The key needs to be `sign_text`.  Let's give the key the value `LOUDER`.  In the browser, let's visit `http://localhost:9393/?sign_text=LOUDER`.  There should now be text on the sign (see Figure 6).

How did the value from the query string end up on the webpage?  We'll need to take a look at a couple of files:  `app/controllers/index.rb` which we've already seen and `app/views/index.erb`.

In Release 0, we discussed the `GET` handler that we defined for requests made to the root path of our application.  In the block that gets executed when a `GET` request is made to the root path (see Figure 4), we have yet to discuss the line `@sign_text = params[:sign_text]`.

```ruby
{ :sign_text => "LOUDER" }
```
*Figure 7*. Representation of `params` hash.

When HTTP requests are made to our server, the query string parameters are made available.  The key-value pairs are added to a hash assigned to the variable `params`.  In our example, the `params` hash has a key `:sign_text`.  The value of that key is the string `"LOUDER"`.  (See Figure 7)

We have access to the data passed in the query string, but what are we doing with it?  We access the value of the `params` hash's `:sign_text` key (i.e., `"LOUDER"`, and we assign that value to the instance variable `@sign_text`.

```text
<% if @sign_text %>
  <span><%= @sign_text %></span>
<% end %>
```
*Figure 8*. Snippet of code from `app/views/index.erb`.

When we assign an instance variable in the block, that instance variable is accessible when we render a template.  In our example we're rendering the template written in `app/views/index.erb` (see Figure 8).  In our template, we insert some Ruby code to say, if the instance variable `@sign_text` is truthy, when rendering the template include the following: `<span><%= @sign_text %></span>`.  Of course, the Ruby snippet `<%= @sign_text %>` will need to be evaluated.  In this example, our rendered template will include `<span>LOUDER</span>`.


### Release 2:  Use the Form to Call out Cheers

Now it's time to call out cheers.  Remember, we want to call out the name of a cheer, and our application will determine which sign the mascot will hold.

We'll use the form to submit the name of a cheer.  In `app/views/index.erb` we define a form, and we give the form some attributes.  The form has a `method` which is `post` and an `action` which is set to `"/cheers"`.  These attributes combine to determine what happens when the form is submitted.  Submitting this form will tell the browser to make a `POST` request to the path `/cheers`.

When the form is submitted, the data entered in the form is sent along as part of the request.  The input fields and their values are combined to form a line of text formatted like a query string which is added to the request body.  Each `input` element's `name` attribute is used as a key.  The value for each key is whatever was entered into the form.  These key-value pairs are added to the `params` hash and are accessible in our request handlers.

A handler for `POST` requests to the path `/cheers` has been defined for us in `app/controllers/index.rb`.  Enter the name of a cheer into the form, submit the form, and take a look at the response displayed in the browser.

Unfortunately, the handler doesn't handle the request in the way we want.  We need to rewrite the handler to do the following.

1. Figure out which cheer name was submitted with the form.
2. Determine which sign the mascot should hold up based on the cheer name.  Remember, this work can be delegated to the `Mascot` module.
3. Redirect the browser to the homepage, adding a query string containing the text to display on the sign. When the form is submitted, the browser should ultimately end up at `http://localhost:9393/?sign_text=foobar` where `foobar` is whatever text should appear on the sign. For guidance, read the Sinatra documentation on [browser redirect][].


## Conclusion
We've taken a whirlwind tour of HTTP and Sinatra: how to deal with `GET` and `POST` requests, how to pass data with a `GET` request, how data in a form is sent as part of a `POST` request, how to access data sent with a request through the `params` hash, how to define a Sinatra request handler, etc.  It's a lot to wrap our heads around.  Fortunately, we're going to get a lot of practice working with Sinatra to build web applications, and we'll grow more and more comfortable with all of this material.

Here are some reading and reference materials on Sinatra.

* [Sinatra Online Documentation][Sinatra] (_less-comprehensive but direct_)
* [Sinatra Book][Sinatra Book] (_more comprehensive, but less direct_)

[Sinatra documentation]: http://www.sinatrarb.com/intro
[browser redirect]: http://www.sinatrarb.com/intro#Browser%20Redirect
[handlers section]: http://sinatra-book.zencephalon.com/#toc_17
[Sinatra Book]: http://sinatra-book.zencephalon.com/
[Sinatra]: http://www.sinatrarb.com/
