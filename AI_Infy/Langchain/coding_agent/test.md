# **Table of Contents**

The Express Handbook

Express overview

Request parameters

Sending a response

Sending a JSON response

Manage Cookies

Work with HTTP headers

Redirects

Routing

CORS

Templating

The Pug Guide

Middleware

Serving static files

Send files

Sessions

Validating input

Sanitizing input

Handling forms

File uploads in forms

An Express HTTPS server with a self-signed certificate

Setup Let's Encrypt for Express


2

The Express Handbook
# **The Express Handbook**

The Express Handbook follows the 80/20 rule: learn in 20% of the time the 80% of a topic.

I find this approach gives a well-rounded overview. This book does not try to cover everything

under the sun related to Express. If you think some specific topic should be included, tell me.

[You can reach me on Twitter @flaviocopes.](https://twitter.com/flaviocopes)

I hope the contents of this book will help you achieve what you want: **learn the basics**

**Express** .

This book is written by Flavio. I **publish web development tutorials** every day on my website

[flaviocopes.com.](https://flaviocopes.com)

Enjoy!

3

Express overview
# **Express overview**

**Express is a Node.js Web Framework. Node.js is an amazing tool for building**
**networking services and applications. Express builds on top of its features to**
**provide easy to use functionality that satisfy the needs of the Web Server use**

**case.**

[Express is a Node.js Web Framework.](https://flaviocopes.com/node/)

Node.js is an amazing tool for building networking services and applications.

Express builds on top of its features to provide easy to use functionality that satisfy the needs

of the Web Server use case.

It's Open Source, free, easy to extend, very performant, and has lots and lots of pre-built

packages you can just drop in and use, to perform all kind of things.
## **Installation**

[You can install Express into any project with npm:](https://flaviocopes.com/npm/)

4

Express overview



[or Yarn:](https://flaviocopes.com/yarn/)



Both commands will also work in an empty directory, to start up your project from scratch,

although npm does not create a package.json file at all, and Yarn creates a basic one.

Just run npm init or yarn init if you're starting a new project from scratch.
## **Hello World**

We're ready to create our first Express Web Server.

Here is some code:



Save this to an index.js file in your project root folder, and start the server using



You can open the browser to port 3000 on localhost and you should see the Hello World!

message.
## **Learn the basics of Express by understanding** **the Hello World code**

Those 4 lines of code do a lot behind the scenes.

First, we import the express package to the express value.

We instantiate an application by calling its app() method.

Once we have the application object, we tell it to listen for GET requests on the / path, using

the get() method.

5

Express overview

There is a method for every HTTP **verb** : get(), post(), put(), delete(), patch() :



Those methods accept a callback function, which is called when a request is started, and we

need to handle it.

We pass in an arrow function:



Express sends us two objects in this callback, which we called req and res, that represent

the Request and the Response objects.

Request is the HTTP request. It can give us all the info about that, including the request

parameters, the headers, the body of the request, and more.

Response is the HTTP response object that we'll send to the client.

What we do in this callback is to send the 'Hello World!' string to the client, using the

Response.send() method.

This method sets that string as the body, and it closes the connection.

The last line of the example actually starts the server, and tells it to listen on port 3000 . We

pass in a callback that is called when the server is ready to accept new requests.


6

Request parameters
# **Request parameters**

**A handy reference to all the request object properties and how to use them**
## **Request parameters**

I mentioned how the Request object holds all the HTTP request information.

These are the main properties you'll likely use:

|Property|Description|
|---|---|
|.app|holds a reference to the Express app object|
|.baseUrl|the base path on which the app responds|
|.body|contains the data submitted in the request body (must be parsed and populated manually before you can access it)|
|.cookies|contains the cookies sent by the request (needs the cookie-parser middleware)|
|.hostname|the server hostname|
|.ip|the server IP|
|.method|the HTTP method used|
|.params|the route named parameters|
|.path|the URL path|
|.protocol|the request protocol|
|.query|an object containing all the query strings used in the request|
|.secure|true if the request is secure (uses HTTPS)|
|.signedCookies|contains the signed cookies sent by the request (needs the cookie- middleware) parser|
|.xhr|true if the request is an XMLHttpRequest|

## **How to retrieve the GET query string parameters** **using Express**

The query string is the part that comes after the URL path, and starts with a question mark ? .

Example:

7

Request parameters



Multiple query parameters can be added using & :



How do you get those query string values in Express?

Express makes it very easy by populating the Request.query object for us:



This object is filled with a property for each query parameter.

If there are no query params, it's an empty object.

This makes it easy to iterate on it using the for...in loop:



This will print the query property key and the value.

You can access single properties as well:


## **How to retrieve the POST query string** **parameters using Express**

POST query parameters are sent by HTTP clients for example by forms, or when performing a

POST request sending data.

How can you access this data?

8

Request parameters

If the data was sent as JSON, using Content-Type: application/json, you will use the

express.json() middleware:



If the data was sent as JSON, using Content-Type: application/x-www-form-urlencoded, you will

use the express.urlencoded() middleware:



In both cases you can access the data by referencing it from Request.body :



Note: older Express versions required the use of the body-parser module to process

POST data. This is no longer the case as of Express 4.16 (released in September 2017)

and later versions.


9

Sending a response
# **Sending a response**

**How to send a response back to the client using Express**

In the Hello World example we used the Response.send() method to send a simple string as a

response, and to close the connection:



If you pass in a string, it sets the Content-Type header to text/html .

if you pass in an object or an array, it sets the application/json Content-Type header, and

parses that parameter into JSON.

send() automatically sets the Content-Length HTTP response header.

send() also automatically closes the connection.
### **Use end() to send an empty response**

An alternative way to send the response, without any body, it's by using the Response.end()

method:


### **Set the HTTP response status**

Use the Response.status() :



or



sendStatus() is a shortcut:



Sending a response

res.sendStatus(404)

// === res.status(404).send('Not Found')

res.sendStatus(500)

// === res.status(500).send('Internal Server Error')


11

Sending a JSON response
# **Sending a JSON response**

**How to serve JSON data using the Node.js Express library**

When you listen for connections on a route in Express, the callback function will be invoked on

every network call with a Request object instance and a Response object instance.

Example:



Here we used the Response.send() method, which accepts any string.

You can send JSON to the client by using Response.json(), a useful method.

It accepts an object or array, and converts it to JSON before sending it:



12

Manage Cookies
# **Manage Cookies**

**How to use the `Response.cookie()` method to manipulate your cookies**

Use the Response.cookie() method to manipulate your cookies.

Examples:



This method accepts a third parameter which contains various options:



The most useful parameters you can set are:

|Value|Description|
|---|---|
|domain|the cookie domain name|
|expires|set the cookie expiration date. If missing, or 0, the cookie is a session cookie|
|httpOnly|set the cookie to be accessible only by the web server. See HttpOnly|
|maxAge|set the expiry time relative to the current time, expressed in milliseconds|
|path|the cookie path. Defaults to /|
|secure|Marks the cookie HTTPS only|
|signed|set the cookie to be signed|
|sameSite|Value of SameSite|



A cookie can be cleared with



13

Work with HTTP headers
# **Work with HTTP headers**

**Learn how to access and change HTTP headers using Express**
## **Access HTTP headers values from a request**

You can access all the HTTP headers using the Request.headers property:



Use the Request.header() method to access one individual request header value:


## **Change any HTTP header value of a response**

You can change any HTTP header value using Response.set() :



There is a shortcut for the Content-Type header however:




14

Work with HTTP headers


15

Redirects
# **Redirects**

**How to redirect to other pages server-side**

Redirects are common in Web Development. You can create a redirect using the

Response.redirect() method:



This creates a 302 redirect.

A 301 redirect is made in this way:



You can specify an absolute path ( /go-there ), an absolute url ( https://anothersite.com ), a

relative path ( go-there ) or use the .. to go back one level:



You can also redirect back to the Referer HTTP header value (defaulting to / if not set) using



16

Routing
# **Routing**

**Routing is the process of determining what should happen when a URL is**
**called, or also which parts of the application should handle a specific**
**incoming request.**

Routing is the process of determining what should happen when a URL is called, or also which

parts of the application should handle a specific incoming request.

In the Hello World example we used this code



This creates a route that maps accessing the root domain URL / using the HTTP GET

method to the response we want to provide.
### **Named parameters**

What if we want to listen for custom requests, maybe we want to create a service that accepts

a string, and returns that uppercase, and we don't want the parameter to be sent as a query

string, but part of the URL. We use named parameters:



If we send a request to /uppercase/test, we'll get TEST in the body of the response.

You can use multiple named parameters in the same URL, and they will all be stored in

req.params .
### **Use a regular expression to match a path**

[You can use regular expressions to match multiple paths with one statement:](https://flaviocopes.com/javascript-regular-expressions/)



will match /post, /post/first, /thepost, /posting/something, and so on.


17

CORS
# **CORS**

**How to allow cross site requests by setting up CORS**

A JavaScript application running in the browser can usually only access HTTP resources on

the same domain (origin) that serves it.

Loading images or scripts/styles always works, but XHR and Fetch calls to another server will

fail, unless that server implements a way to allow that connection.

This way is called CORS, **Cross-Origin Resource Sharing** .

Also loading Web Fonts using @font-face has same-origin policy by default, and other less

popular things (like WebGL textures and drawImage resources loaded in the Canvas API).

One very important thing that needs CORS is **ES Modules**, recently introduced in modern

browsers.

If you don't set up a CORS policy **on the server** that allows to serve 3rd part origins, the

request will fail.

Fetch example:

XHR example:

18

CORS

A Cross-Origin resource fails if it's:

to a different **domain**

to a different **subdomain**

to a different **port**

to a different **protocol**

and it's there for your security, to prevent malicious users to exploit the Web Platform.

But if you control both the server and the client, you have all the good reasons to allow them to

talk to each other.

How?

It depends on your server-side stack.
## **Browser support**

Pretty good (basically all except IE<10):
## **Example with Express**

[If you are using Node.js and Express as a framework, use the CORS middleware package.](https://github.com/expressjs/cors)

Here's a simple implementation of an Express Node.js server:

const express = require('express')

const app = express()

19

CORS



If you hit /without-cors with a fetch request from a different origin, it's going to raise the

CORS issue.

All you need to do to make things work out is to require the cors package linked above, and

pass it in as a middleware function to an endpoint request handler:



[I made a simple Glitch example. Here is the client working, and here's its code:](https://flavio-cors-client.glitch.me/)

[https://glitch.com/edit/#!/flavio-cors-client.](https://glitch.com/edit/#!/flavio-cors-client)

[This is the Node.js Express server: https://glitch.com/edit/#!/flaviocopes-cors-example-express](https://glitch.com/edit/#!/flaviocopes-cors-example-express)

Note how the request that fails because it does not handle the CORS headings correctly is still

received, as you can see in the Network panel, where you find the message the server sent:

20

CORS
## **Allow only specific origins**

This example has a problem however: ANY request will be accepted by the server as cross
origin.

As you can see in the Network panel, the request that passed has a response header access
control-allow-origin: * :

You need to configure the server to only allow one origin to serve, and block all the others.

Using the same cors Node library, here's how you would do it:



You can serve more as well:



21

CORS
## **Preflight**

There are some requests that are handled in a "simple" way. All GET requests belong to this

group.

Also *some* POST and HEAD requests do as well.

POST requests are also in this group, if they satisfy the requirement of using a Content-Type

of

application/x-www-form-urlencoded

multipart/form-data

text/plain

All other requests must run through a pre-approval phase, called preflight. The browser does

this to determine if it has the permission to perform an action, by issuing an OPTIONS request.

A preflight request contains a few headers that the server will use to check permissions

(irrelevant fields omitted):



The server will respond with something like this(irrelevant fields omitted):



We checked for POST, but the server tells us we can also issue other HTTP request types for

that particular resource.

Following the Node.js Express example above, the server must also handle the OPTIONS

request:



22

CORS


23

Templating
# **Templating**

**Express is capable of handling server-side template engines. Template**
**engines allow us to add data to a view, and generate HTML dynamically.**

Express is capable of handling server-side template engines.

Template engines allow us to add data to a view, and generate HTML dynamically.

Express uses Jade as the default. Jade is the old version of Pug, specifically Pug 1.0.

The name was changed from Jade to Pug due to a trademark issue in 2016, when the

project released version 2. You can still use Jade, aka Pug 1.0, but going forward, it's

best to use Pug 2.0

Although the last version of Jade is 3 years old (at the time of writing, summer 2018), it's still

the default in Express for backward compatibility reasons.

In any new project, you should use Pug or another engine of your choice. The official site of

[Pug is https://pugjs.org/.](https://pugjs.org/)

You can use many different template engines, including Pug, Handlebars, Mustache, EJS and

more.
## **Using Pug**

To use Pug we must first install it:



and when initializing the Express app, we need to set it:



We can now start writing our templates in .pug files.

Create an about view:




24

Templating

and the template in views/about.pug :



This template will create a p tag with the content Hello from Flavio .

You can interpolate a variable using




This is a very short introduction to Pug, in the context of using it with Express. Look at the Pug

guide for more information on how to use Pug.

If you are used to template engines that use HTML and interpolate variables, like Handlebars

(described next), you might run into issues, especially when you need to convert existing

HTML to Pug. This online converter from HTML to Jade (which is very similar, but a little

[different than Pug) will be a great help: https://jsonformatter.org/html-to-jade](https://jsonformatter.org/html-to-jade)

[Also see the differences between Jade and Pug](https://pugjs.org/api/migration-v2.html)
## **Using Handlebars**

Let's try and use Handlebars instead of Pug.

You can install it using npm install hbs .

Put an about.hbs template file in the views/ folder:



and then use this Express configuration to serve it on /about :




Templating

res.render('about', { name: 'Flavio' })

})

app.listen(3000, () => console.log('Server ready'))

You can also **render a React application server-side**, using the [express-react-views](https://github.com/reactjs/express-react-views)

package.

Start with npm install express-react-views react react-dom .

Now instead of requiring hbs we require express-react-views and use that as the engine,

using jsx files:



Just put an about.jsx file in views/, and calling /about should present you an "Hello from

Flavio" string:



26

The Pug Guide
# **The Pug Guide**

**How to use the Pug templating engine**

Introduction to Pug

How does Pug look like

Install Pug

Setup Pug to be the template engine in Express

Your first Pug template

Interpolating variables in Pug

Interpolate a function return value

Adding id and class attributes to elements

Set the doctype

Meta tags

Adding scripts and styles

Inline scripts

Loops

Conditionals

Set variables

Incrementing variables

Assigning variables to element values

Iterating over variables

Including other Pug files

Defining blocks

Extending a base template

Comments

Visible

Invisible
## **Introduction to Pug**

What is Pug? It's a template engine for server-side Node.js applications.

Express is capable of handling server-side template engines. Template engines allow us to

add data to a view, and generate HTML dynamically.

Pug is a new name for an old thing. It's *Jade 2.0* .


27

The Pug Guide

The name was changed from Jade to Pug due to a trademark issue in 2016, when the project

released version 2. You can still use Jade, aka Pug 1.0, but going forward, it's best to use Pug

2.0

[Also see the differences between Jade and Pug](https://pugjs.org/api/migration-v2.html)

Express uses Jade as the default. Jade is the old version of Pug, specifically Pug 1.0.

Although the last version of Jade is 3 years old (at the time of writing, summer 2018), it's still

the default in Express for backward compatibility reasons.

In any new project, you should use Pug or another engine of your choice. The official site of

[Pug is https://pugjs.org/.](https://pugjs.org/)
## **How does Pug look like**



This template will create a p tag with the content Hello from Flavio .

As you can see, Pug is quite special. It takes the tag name as the first thing in a line, and the

rest is the content that goes inside it.

If you are used to template engines that use HTML and interpolate variables, like Handlebars

(described next), you might run into issues, especially when you need to convert existing

HTML to Pug. This online converter from HTML to Jade (which is very similar, but a little

[different than Pug) will be a great help: https://jsonformatter.org/html-to-jade](https://jsonformatter.org/html-to-jade)
## **Install Pug**

Installing Pug is as simple as running npm install :


## **Setup Pug to be the template engine in Express**

and when initializing the Express app, we need to set it:



## **Your first Pug template**

Create an about view:




and the template in views/about.pug :



This template will create a p tag with the content Hello from Flavio .
## **Interpolating variables in Pug**

You can interpolate a variable using



## **Interpolate a function return value**

You can interpolate a function return value using




## **Adding id and class attributes to elements**


29

The Pug Guide


## **Set the doctype**


## **Meta tags**



## **Adding scripts and styles**


## **Inline scripts**


## **Loops**


30

The Pug Guide


## **Conditionals**



else-if works too:


## **Set variables**

You can set variables in Pug templates:


## **Incrementing variables**

You can increment a numeric variable using ++ :


## **Assigning variables to element values**


31

The Pug Guide



## **Iterating over variables**

You can use for or each . There is no difference.




You can use .length to get the number of items:



while is another kind of loop:


## **Including other Pug files**

In a Pug file you can include other Pug files:


## **Defining blocks**

A well organized template system will define a base template, and then all the other templates

extend from it.

32

The Pug Guide

The way a part of a template can be extended is by using blocks:

In this case one block, body, has some content, while head does not. head is intended to

be used to add additional content to the heading, while the body content is made to be

overridden by other pages.
## **Extending a base template**

A template can extend a base template by using the extends keyword:



Once this is done, you need to redefine blocks. All the content of the template must go into

blocks, otherwise the engine does not know where to put them.

Example:




You can redefine one or more blocks. The ones not redefined will be kept with the original

template content.
## **Comments**

Comments in Pug can be of two types: visible or not visible in the resulting HTML.


33

The Pug Guide
### **Visible**

Inline:



Block:


### **Invisible**

Inline:



Block:




34

Middleware
# **Middleware**

**A middleware is a function that hooks into the routing process, and performs**
**some operation at some point, depending on what it want to do.**

A middleware is a function that hooks into the routing process, and performs some operation

at some point, depending on what it want to do.

It's commonly used to edit the request or response objects, or terminate the request before it

reaches the route handler code.

It's added to the execution stack like this:



This is similar to defining a route, but in addition to the Request and Response objects

instances, we also have a reference to the *next* middleware function, which we assign to the

variable next .

We always call next() at the end of our middleware function, to pass the execution to the

next handler, unless we want to prematurely end the response, and send it back to the client.

You typically use pre-made middleware, in the form of npm packages. A big list of the

[available ones is here.](https://expressjs.com/en/resources/middleware.html)

One example is cookie-parser, which is used to parse the cookies into the req.cookies

object. You install it using npm install cookie-parser and you can use it like this:



You can also set a middleware function to run for specific routes only, not for all, by using it as

the second parameter of the route definition:



35

Middleware

If you need to store data that's generated in a middleware to pass it down to subsequent

middleware functions, or to the request handler, you can use the Request.locals object. It will

attach that data to the current request:



36

Serving static files
# **Serving static files**

**How to serve static assets directly from a folder in Express**

It's common to have images, CSS and more in a public subfolder, and expose them to the

root level:



If you have an index.html file in public/, that will be served if you now hit the root domain

URL ~~(~~ http://localhost:3000 )


37

Send files
# **Send files**

**Express provides a handy method to transfer a file as attachment:**
**`Response.download()`**

Express provides a handy method to transfer a file as attachment: Response.download() .

Once a user hits a route that sends a file using this method, browsers will prompt the user for

download.

The Response.download() method allows you to send a file attached to the request, and the

browser instead of showing it in the page, it will save it to disk.



In the context of an app:



You can set the file to be sent with a custom filename:



This method provides a callback function which you can use to execute code once the file has

been sent:




38

Sessions
# **Sessions**

**How to use sessions to identify users across requests**

By default Express requests are sequential and no request can be linked to each other. There

is no way to know if this request comes from a client that already performed a request

previously.

Users cannot be identified unless using some kind of mechanism that makes it possible.

That's what sessions are.

When implemented, every user of you API or website will be assigned a unique session, and

this allows you to store the user state.

We'll use the express-session module, which is maintained by the Express team.

You can install it using



and once you're done, you can instantiate it in your application with



This is a middleware, so you *install* it in Express using



After this is done, all the requests to the app routes are now using sessions.

secret is the only required parameter, but there are many more you can use. It should be a

randomly unique string for you application.

The session is attached to the request, so you can access it using req.session here:



39

Sessions

This object can be used to get data out of the session, and also to set data:

This data is serialized as JSON when stored, so you are safe to use nested objects.

You can use sessions to communicate data to middleware that's executed later, or to retrieve

it later on on subsequent requests.

Where is the session data stored? it depends on how you set up the express-session module.

It can store session data in

**memory**, not meant for production

a **database** like MySQL or Mongo

a **memory cache** like Redis or Memcached

There is a big list of 3rd packages that implement a wide variety of different compatible

[caching stores in https://github.com/expressjs/session](https://github.com/expressjs/session)

All solutions store the session id in a cookie, and keep the data server-side. The client will

receive the session id in a cookie, and will send it along with every HTTP request.

We'll reference that server-side to associate the session id with the data stored locally.

Memory is the default, it requires no special setup on your part, it's the simplest thing but it's

meant only for development purposes.

The best choice is a memory cache like Redis, for which you need to setup its own

infrastructure.

Another popular package to manage sessions in Express is cookie-session, which has a big

difference: it stores data client-side in the cookie. I do not recommend doing that because

storing data in cookies means that it's stored client-side, and sent back and forth in every

single request made by the user. It's also limited in size, as it can only store 4 kilobytes of

data. Cookies also need to be secured, but by default they are not, since secure Cookies are

possible on HTTPS sites and you need to configure them if you have proxies.

40

Validating input
# **Validating input**

**Learn how to validate any data coming in as input in your Express endpoints**

Say you have a POST endpoint that accepts the name, email and age parameters:



How do you server-side validate those results to make sure

name is a string of at least 3 characters?

email is a real email?

age is a number, between 0 and 110?

The best way to handle validating any kind of input coming from outside in Express is by using

the [express-validator](https://express-validator.github.io) package:



You require the check object from the package:



We pass an array of check() calls as the second argument of the post() call. Every

check() call accepts the parameter name as argument:




41

Validating input

Notice I used

isLength()

isEmail()

isNumeric()

[There are many more of these methods, all coming from validator.js, including:](https://github.com/chriso/validator.js#validators)

contains(), check if value contains the specified value

equals(), check if value equals the specified value

isAlpha()

isAlphanumeric()

isAscii()

isBase64()

isBoolean()

isCurrency()

isDecimal()

isEmpty()

isFQDN(), is a fully qualified domain name?

isFloat()

isHash()

isHexColor()

isIP()

isIn(), check if the value is in an array of allowed values

isInt()

isJSON()

isLatLong()

isLength()

isLowercase()

isMobilePhone()

isNumeric()

isPostalCode()

isURL()

isUppercase()

isWhitelisted(), checks the input against a whitelist of allowed characters

You can validate the input against a regular expression using matches() .

Dates can be checked using

isAfter(), check if the entered date is after the one you pass

isBefore(), check if the entered date is before the one you pass

isISO8601()


42

Validating input

isRFC3339()

For exact details on how to use those validators, refer to

[https://github.com/chriso/validator.js#validators.](https://github.com/chriso/validator.js#validators)

All those checks can be combined by piping them:



If there is any error, the server automatically sends a response to communicate the error. For

example if the email is not valid, this is what will be returned:




This default error can be overridden for each check you perform, using withMessage() :



What if you want to write your own special, custom validator? You can use the custom

validator.

In the callback function you can reject the validation either by throwing an exception, or by

returning a rejected promise:



43

Validating input

The custom validator:



can be rewritten as



44

Sanitizing input
# **Sanitizing input**

You've seen how to validate input that comes from the outside world to your Express app.

There's one thing you quickly learn when you run a public-facing server: never trust the input.

Even if you sanitize and make sure that people can't enter weird things using client-side code,

you'll still be subject to people using tools (even just the browser devtools) to POST directly to

your endpoints.

Or bots trying every possible combination of exploit known to humans.

What you need to do is sanitizing your input.

The [express-validator](https://express-validator.github.io) package you already use to validate input can also conveniently used

to perform sanitization.

Say you have a POST endpoint that accepts the name, email and age parameters:



You might validate it using:





You can add sanitization by piping the sanitization methods after the validation ones:


45

Sanitizing input

Here I used the methods:

trim() trims characters (whitespace by default) at the beginning and at the end of a

string

escape() replaces <,   -, &, ', " and / with their corresponding HTML entities

normalizeEmail() canonicalizes an email address. Accepts several options to lowercase

email addresses or subaddresses (e.g. flavio+newsletters@gmail.com )

Other sanitization methods:

blacklist() remove characters that appear in the blacklist

whitelist() remove characters that do not appear in the whitelist

unescape() replaces HTML encoded entities with <,   -, &, ', " and /

ltrim() like trim(), but only trims characters at the start of the string

rtrim() like trim(), but only trims characters at the end of the string

stripLow() remove ASCII control characters, which are normally invisible

Force conversion to a format:

toBoolean() convert the input string to a boolean. Everything except for '0', 'false' and ''

returns true. In strict mode only '1' and 'true' return true

toDate() convert the input string to a date, or null if the input is not a date

toFloat() convert the input string to a float, or NaN if the input is not a float

toInt() convert the input string to an integer, or NaN if the input is not an integer

Like with custom validators, you can create a custom sanitizer.

In the callback function you just return the sanitized value:



46

Sanitizing input


47

Handling forms
# **Handling forms**

**How to process forms using Express**

This is an example of an HTML form:



When the user press the submit button, the browser will automatically make a POST request

to the /submit-form URL on the same origin of the page, sending the data it contains,

encoded as application/x-www-form-urlencoded . In this case, the form data contains the

username input field value.

Forms can also send data using the GET method, but the vast majority of the forms you'll

build will use POST .

The form data will be sent in the POST request body.

To extract it, you will use the express.urlencoded() middleware, provided by Express:



Now you need to create a POST endpoint on the /submit-form route, and any data will be

available on Request.body :



Don't forget to validate the data before using it, using express-validator .


48

File uploads in forms
# **File uploads in forms**

**How to manage storing and handling files uploaded via forms, in Express**

This is an example of an HTML form that allows a user to upload a file:



When the user press the submit button, the browser will automatically make a POST request

to the /submit-form URL on the same origin of the page, sending the data it contains, not

encoded as application/x-www-form-urlencoded as a normal form, but as multipart/form-data .

Server-side, handling multipart data can be tricky and error prone, so we are going to use a

utility library called **formidable** [. Here's the GitHub repo, it has over 4000 stars and well](https://github.com/felixge/node-formidable)

maintained.

You can install it using:



Then in your Node.js file, include it:




Now in the POST endpoint on the /submit-form route, we instantiate a new Formidable form

using formidable.IncomingFrom() :



After doing so, we need to parse the form. We can do so synchronously by providing a

callback, which means all files are processed, and once formidable is done, it makes them

available:

app.post('/submit-form', (req, res) => {

new formidable.IncomingFrom().parse(req, (err, fields, files) => {

if (err) {


49

Or you can use events instead of a callback, to be notified when each file is parsed, and other

events, like ending processing, receiving a non-file field, or an error occurred:



Whatever way you choose, you'll get one or more Formidable.File objects, which give you

information about the file uploaded. These are some of the methods you can call:

file.size, the file size in bytes

file.path, the path this file is written to

file.name, the name of the file

file.type, the MIME type of the file

The path defaults to the temporary folder and can be modified if you listen to the fileBegin

event:

app.post('/submit-form', (req, res) => {

new formidable.IncomingFrom().parse(req)

.on('fileBegin', (name, file) => {

form.on('fileBegin', (name, file) => {

file.path = __dirname + '/uploads/' + file.name

})


50

File uploads in forms

})

.on('file', (name, file) => {

console.log('Uploaded file', name, file)

})

//...

})


51

An Express HTTPS server with a self-signed certificate
# **An Express HTTPS server with a self-** **signed certificate**

**How to create a self-signed HTTPS certificate for Node.js to test apps locally**

To be able to serve a site on HTTPS from localhost you need to create a self-signed

certificate.

A self-signed certificate will be enough to establish a secure HTTPS connection, although

browsers will complain that the certificate is self-signed and as such it's not trusted. It's great

for development purposes.

To create the certificate you must have **OpenSSL** installed on your system.

You might have it installed already, just test by typing openssl in your terminal.

If not, on a Mac you can install it using brew install openssl [if you use Homebrew. Otherwise](https://brew.sh)

search on Google "how to install openssl on ".

Once OpenSSL is installed, run this command:



It will as you a few questions. The first is the country name:



Then your state or province:



your city:


52

An Express HTTPS server with a self-signed certificate



and your organization name:

You can leave all of these empty.

Just remember to set this to localhost :



and to add your email address:



That's it! Now you have 2 files in the folder where you ran this command:

server.cert is the self-signed certificate file

server.key is the private key of the certificate

Both files will be needed to establish the HTTPS connection, and depending on how you are

going to setup your server, the process to use them will be different.

Those files need to be put in a place reachable by the application, then you need to configure

the server to use them.

This is an example using the https core module and Express:



without adding the certificate, if I connect to https://localhost:3000 this is what the browser

will show:


53

An Express HTTPS server with a self-signed certificate

With the certificate in place:



Chrome will tell us the certificate is invalid, since it's self-signed, and will ask us to confirm to

continue, but the HTTPS connection will work:

54

An Express HTTPS server with a self-signed certificate


55

Setup Let's Encrypt for Express
# **Setup Let's Encrypt for Express**

**How to set up HTTPS using the popular free solution Let's Encrypt**

If you run a Node.js application on your own VPS, you need to manage getting an SSL

certificate.

[Today the standard for doing this is to use Let's Encrypt and Certbot, a tool from EFF, aka](https://letsencrypt.org)

Electronic Frontier Foundation, the leading nonprofit organization focused on privacy, free

speech, and in general civil liberties in the digital world.

These are the steps we'll follow:

Install Certbot

Generate the SSL certificate using Certbot

Allow Express to serve static files

Confirm the domain

Obtain the certificate

Setup the renewal
## **Install Certbot**

Those instructions assume you are using Ubuntu, Debian or any other Linux distribution that

uses apt-get :



You can also install Certbot on a Mac to test:



but you will need to link that to a real domain name, in order for it to be useful.
## **Generate the SSL certificate using Certbot**

Now that Certbot is installed, you can invoke it to generate the certificate. You must run this as

root:

56

Setup Let's Encrypt for Express



or call sudo



The installer will ask you the domain of your website.

This is the process in detail.

It asks for the email

It asks to accept the ToS:



It asks to share the email address




And finally we can enter the domain where we want to use the SSL certificate:



It asks if it's ok to log your IP:

Obtaining a new certificate

Performing the following challenges:


57

Setup Let's Encrypt for Express



And finally we get to the verification phase!



Now let's leave Certbot alone for a couple minutes.

We need to verify we own the domain, by creating a file named TS_oZ2
ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E in the .well-known/acme-challenge/ folder. Pay attention!

The weird string I just pasted change every single time.

You'll need to create the folder and the file, since they do not exist by default.

In this file you need to put the content that Certbot printed:



As for the filename, this string is unique each time you run Certbot.
## **Allow Express to serve static files**

In order to serve that file from Express, you need to enable serving static files. You can create

a static folder, and add there the .well-known subfolder, then configure Express like this:




Setup Let's Encrypt for Express

app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))

//...

The dotfiles option is mandatory otherwise .well-known, which is a dotfile as it starts with a

dot, won't be made visible. This is a security measure, because dotfiles can contain sensitive

information and they are better off preserved by default.
## **Confirm the domain**

Now run the application and make sure the file is reachable from the public internet, and go

back to Certbot, which is still running, and press ENTER to go on with the script.
## **Obtain the certificate**

That's it! If all went well, Certbot created the certificate, and the private key, and made them

available in a folder on your computer (and it will tell you which folder, of course).

Now copy/paste the paths into your application, to start using them to serve your requests:



Note that I made this server listen on port 443, so you need to run it with root permissions.

Also, the server is exclusively running in HTTPS, because I used https.createServer() . You

can also run an HTTP server alongside this, by running:

http.createServer(app).listen(80, () => {

console.log('Listening...')

})

https.createServer({

59

Setup Let's Encrypt for Express

key: fs.readFileSync('/etc/letsencrypt/path/to/key.pem'),

cert: fs.readFileSync('/etc/letsencrypt/path/to/cert.pem'),

ca: fs.readFileSync('/etc/letsencrypt/path/to/chain.pem')

}, app).listen(443, () => {

console.log('Listening...')

})
## **Setup the renewal**

The SSL certificate is not going to be valid for 90 days. You need to set up an automated

system for renewing it.

How? Using a cron job.

A cron job is a way to run tasks every interval of time. It can be eery week, every minute, every

month.

In our case we'll run the renewal script twice per day, as recommended in the Certbot

documentation.

First find out the absolute path of certbot on you system. I use type certbot on macOS to

get it, and in my case it's /usr/local/bin/certbot .

Here's the script we need to run:

certbot renew

This is the cron job entry:



It means run it every 12 hours, every day: at 00:00 and at 12:00.

[Tip: I generated this line using https://crontab-generator.org/](https://crontab-generator.org/)

Add this script to your crontab, by using the command:



This opens the pico editor (you can choose the one you prefer). You enter the line, save,

and the cron job is installed.

Once this is done, you can see the list of cron jobs active using



60

Setup Let's Encrypt for Express


61

