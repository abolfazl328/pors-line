# pors-line

this is a web site made by Nodejs to make simple forms and publish them

form saz

in order to get the setup readey u need to have latest version of nodejs and npm install on the server and a live mysql server to connect to it as database

now u need to make and .env fiel in root of the project and fill it with these values:

database = "pors line" # give the data ba name that u want to connect to it

user = "root" # give user name that has acces to mysql connection

password= "password" # give it password in order to connect to database

host = "localhost" # enter your databse host

secret= "this is a project that allows user to make forms and publish them so other can file it up" # make an secret key encrypting

port = "3306" # the port that mysql server listens to

dialect = "mysql" # the database model

email = "...@gmail.com" # enter an google account in order to connect to it and send emails

emailPass = "google account password" # enter the password that u have providee for this app in google account

serverHost = "http://localhost:4000" # enter your server host name

then u can start the server by running the command npm run start-server
