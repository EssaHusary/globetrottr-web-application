# Globetrottr Web Application

I wrote this application with 5 other teammates. It is similar to TripAdvisor, in which a user can plan trips, get the best routes, and get info on notable landmarks. 

We used MVC architecture (Model-View-Controller) in the design of our app. We used React for the View layer. Whether it’s login, account editing, or form submission, we handled these in the View layer using React. As far as the Controller and Model layers are concerned, these were handled of course in the backend. We used MongoDB. Queries, schedules, and user info were stored and accessed from our database and each had their own structure in the database. Our Controller layer has its own folder called “Controller” to send data back to the View layer that it handled. It handled tasks such as updating or removing schedules; logging in a user, creating a new user, or updating user info like email; and, it handles requests like viewing search history.

Users have a great UI to work with as everything is clear and easy to use. They can login or create a new account, they can add a travel schedule, they can attain info about a location, and they can get search results for a trip they want to make. 


Here is an example of what users can expect to see when creating a new schedule: 

![image](https://github.com/user-attachments/assets/2b2e9ed8-20f1-4c18-8497-b8972946beca)
![image](https://github.com/user-attachments/assets/a02a9d08-865d-49b4-9675-9c6f9896d24e)


Here is an example of what users can expect to see when checking out their schedules:
![image](https://github.com/user-attachments/assets/98378017-7a21-45c4-b793-c023a71f6a0a)




**Application URL: https://www.globetrottr.org**

API Guide:
1. Register for API keys on www.bingmapsportal.com, https://opentripmap.io product, and https://api-ninjas.com/api/geocoding.
2. In the .env file of backend, add the following variables with the values from (1): GEOCODING_API_KEY, OPENTRIPMAP_API_KEY, and BINGMAP_API_KEY.
