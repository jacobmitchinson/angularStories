# angularStories

AngularStories is my first Angular project without stabilisers. It is a responsive retail shop that was designed to be able to read an API of clothes, interpret the data, and then satisfy the following user stories:

> * [x] = Done

* [x] As a user I can add a product to my shopping list
* [x] As a user I can remove a product from my shopping cart
* [x] As a user I can view the total price for my products in my shopping cart
* [x] As a user I can apply a voucher to my shopping cart
* [x] As a user I can view the total price for the products in my shopping cart with discounts applied
* [x] As a user I am alerted when I apply an invalid voucher to my shopping cart

# How to Run

* npm install
* npm start

# How to Test

* Unit: npm test
* Feature: protractor test/protractor-conf.js

# Technologies

* Angular for API calls and MVC 
* E2E testing with Protractor 
* Unit testing with Karma
* Bootstrap 

# What I Learnt 

To complete this project I had to get to grips with Angular. I tried to follow the Angular tutorial on the website but the jargon on the site proved difficult to penetrate. For the first few days of the project I used the following resources in this order: 

* A talk with Angular creator, Miško Hevery: https://www.youtube.com/watch?v=X0VsStcCCM8
* My favourite AngularJS book: http://www.angularjsbook.com/angular-basics/chapters/introduction/
* PhoneCat Angular tutorial
* MakersAcademy AngularJS tutorial (updated just in time!)

# What Needs Improvement 

* [] Seperate voucher controller from main controller
* [] Refactor methods in voucher controller
* [] DRY out feature tests
* [] Fix bug where discounted voucher price does not update if you return to the shop, add an item, and go back to the checkout
* [] Improve responsive design of the application 

