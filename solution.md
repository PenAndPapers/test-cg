# Tools used
1. Vue JS version 3
2. Vue router - for handling application routes
3. Typescript - for type checking of code variables, function parameters, objects
4. Sass - for application styles

# Structure
page - cointains all pages for the application

components - contains reusable components for the application

router - contains the router configuration

models - contains typescript interfaces

utils - for setting, getting, removing session storage item

assets - where we add styles, images

# Details

Since the application is just small I did not used a state management library

Clicking each button will navigation the user to different screens/pages

User details will be stored to session storage after they filled up and submitted the form
I used session storage to store the details and used it to autofill form when page is reloaded or navigating from Page 3 to Page 2 to help users not to fill up the form again.

When age, country, package is changed it will re calculate the premium price

Premium price will only be displayed once user has provided their age

I've also added simple form validation by making all fields required to ensure that the application collects all necessary informations before user can proceed to Page 3

Page 3 will not be accessible if user is not yet done filling up the form

Application will display a 404 message if route is not valid
