# employee_review_system
# employee_review_system
A scalable full stack web application which lets admin **to create employee, Assign employees to participate in another employee's performance review**.
Deployed at : https://employee-review-system-gaurav.herokuapp.com/
# Tech Stack Used:
## Node.js:
   for server-side scripting.
## Express.js:
   as a backend framework to implement MVC Structure.
## Passport.js:
   as an Authentication middleware for Node.js. Implemented **passport-local-strategy**  
## MongoDB Atlas:
   as the database for storing all the data related to user,review and session cookies.
## Html5 and Css3:
   for designing the front end of the web application.

# Key Features:
  - An employee can register, only admin can make an employee an admin
  - Admin can Add/remove/update/view employees.
  - Admin can Add/update/view performance reviews.
  - Admin can Assign employees to participate in another employee's performance review.
  - Employee can view List of performance review requiring feedback.
  - Employee can Submit feedback.



# To run the project on your local machine:

  1) Open terminal. 

  2) Change the current working directory to the location where you want the cloned directory.

  ```
  $ git clone https://github.com/gauravkhede/employee_review_system
  ```

  3) Install all the dependencies by running :

  ```
  npm install
  ```

  4) node index.js to run the project at local host, port 8000:

   ```
  node index.js
  ```

  5) In your browser, enter the URL :

  ```
  localhost:8000/user-signup
