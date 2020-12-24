# TAMK's WEATHER_STATION ICT 2020,

This project was one of my compulsory courses as Tampere Univerisity of Applied Sciences. The work contains 3 working months both in group (3 members) and individual.
Specifically, the project is divided in 2 crucial parts and required knowledge of 2 courses:
> The web part focuses mainly on the frontend (HTML, CSS, JS) no framework is attempted

+ Circuitry (Embedded Systems course)

The hardware system's aims are creating an online website to track changes of the current weather states as well as providing a friendly-user interaction. 
Initially, it needs signals. TAMK has a high-end sensor system on the rooftop to capture all types of weather data, eg temperature, light, rain, humidity...
The responsibilities to convert those DC/AC signals to more understandable human languages like frequency, voltage. Each group is in charge of a specific signal. Team (KAKASHI solutions Ltd)'s signal is **humidity_out**. After creating a board to capture and transform the signal we used  MQTT broker which is a server that receives all messages from the clients and then routes the messages to the the server where json data messages are ready to publish to database for web usage <br/>
More detail of how the embedded system works please check <br/>
*folder*: ES2020_KAKASHI_HUMIDITY_OUT [click me](./ES2020_KAKASHI_HUMIDITY_OUT)

+ Web (Basic of web development course)

With the database from the first move, it's time for individual work. With the help of lecturers, I were guided how to implement docker containers included frontend, adminer (postgreSQL), API and learnt quite a lot in working with github. The aims of backend APIs are to group and filter necessary data in each endpoint for further usage in web visualization. Frontend part is the main part of the project because the It's time to do thing individually. There are some requirements to meet like making graph, table, drop-down list,... <br/>
Please kindly check <br/>
folder: *./frontend/weather* (frontend) [click me](./frontend) <br/>
<del> *website*: [text](http://bowd31.course.tamk.cloud/) deactivated </del> 
## Demo: [click me](./demo)
***SPECIAL THANKS TO MY LECTURERS:***
* Web: Mr Esa Parkkila and Mr Pekka Pöyry
* Embedded: Mr Kari Naakka and Mr Esa Kunnari


