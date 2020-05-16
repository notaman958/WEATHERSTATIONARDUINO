**WELCOME to WEATHERSTATION ICT 2020,**

This project was one of my compulsory courses as Tampere Univerisity of Applied Sciences. The work contains 3 working months both in group (3 members) and individual.
Specifically, the project is divided in 2 crucial parts and required knowledge of 2 courses:
> I'm taking them while doing this project :D

+ Circuitry (Embedded Systems course)

Because its aims are creating an online website to track changes of the current weather states as well as providing a friendly-user interaction. 
Initially, it needs signals. Our school have a high-end sensor system on the rooftop to capture all types of weather data, eg temperature, light, rain, humidity...
It's our responsibilities to convert those DC/AC signals to more understandable human languages like frequency, voltage. Each group is in charge of a specific signal. Our team (KAKASHI solutions Ltd) signal is **humidity_out**. After creating a board to capture and transform the signal we used  MQTT broker which is a server that receives all messages from the clients and then routes the messages to the VM where json data messages are ready to publish to database for web usage <br/>
For more detail of how the embedded system works please check <br/>
*folder*: ES2020_KAKASHI_HUMIDITY_OUT

+ Web (Basic of web development course)

With the database from the first move, it's time for individual work. With the help of lecturers, I were guided how to implement docker containers included frontend, adminer (postgreSQL), API and learnt quite a lot in working with github. After settling down all the backend. The aims of backend APIs are to group and filter necessary data in each endpoint for further usage in web visualization. Frontend part is one of the interesting parts in doing this project since It's time to do thing by own. Since the work is counted in GPA, we were required to meet some certain tasks like making graph, table, drop-down list,... <br/>
For more detail of how I did please check <br/>
folder: */frontend/weather* (frontend) and* /api* (backend)<br/>
*website*: [text](http://bowd31.course.tamk.cloud/)

***SPECIAL THANKS TO MY LECTURERS:***
* Web: Mr Esa Parkkila and Mr Pekka Pöyry
* Embedded: Mr Kari Naakka and Mr Esa Kunnari


