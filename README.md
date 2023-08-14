# To-Do WebApp

In Task 3, a PC-side ToDo application was made. Task four is to optimize it for mobile devices.

## ToDo WebApp Version
    
* [My blog](https://github.com/Dhyey3187)

## Details

* **Data Storage**

Stored in LocalStorage as a JSON mock data table

          Using the idea of database, build 3 tables.
          categoryJson classification
          childCateJson subcategory
          taskJson task
         
          classification table
          ----------------------
          id* | name | child(FK)
          ----------------------
         
          ChildCategory table childCate
          --------------------------------
          id* | pid(FK) | name | child(FK)
          --------------------------------
         
          task table task
          ----------------------------------------------
          id* | pid(FK) | finish | name | date | content
          ----------------------------------------------


* **CSS code refactored to use `Sass`**
    
    Use block, inheritance, etc. to make the code clearer.

* **Responsive Layout**
    
     A lot of adjustments have been made for the details of the mobile phone, which is more in line with the visual interaction habits on the mobile phone.

* **Add page switching effect**
    
     Use `translate3d()`, pure CSS3 transition animation effect.

* **Handled XSS protection**
    
     Escape characters that might cause damage.

* **Performance Optimization**
    
     Use CDN to handle static resources fontAwesome, compress static resources, etc.

* **Modular**
    
     Modular JavaScript code with requireJS. Refactor JavaScript code. Optimize the highly coupled binding events written before, rebind the events, and reduce the coupling. During the period, the code of the event proxy was rewritten according to specific requirements.

* **Front-end engineering**
    
     Automatically compile Sass, minify CSS and JavaScript code with gulp. And configure the automatic process.
