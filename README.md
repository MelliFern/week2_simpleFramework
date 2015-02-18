# week2_simpleFramework

This is a simple REST Framework

Resources:
- school
- company
Server is running on port 3000

Methods:
POST  - Creates a new file in either school or company based on the url and input JSON data
PUT   - Rewrites the contents of file  based on the url and input JSON data
PATCH - Adds and/or Modifies data based on the input JSON data
GET   - Returns the contents of the file specified in url 
DELETE- Deletes the file with the id in the url 


Sample inputs  :
POST 
input: superagent localhost:3000/school POST {id:"student", name:"JANE DOE"}
output: file ./school/file_school.json content : {id:"student", name:"JANE DOE"}
---------------------------------------------------------------------------------------
PUT 
input: superagent localhost:3000/school/student PUT {id:"student", fname:"Jane", lname:"Doe"}
output: file ./school/file_school.json content : {id:"student", fname:"Jane", lname:"Doe"}
---------------------------------------------------------------------------------------
PATCH
input: superagent localhost:3000/school/student PATCH {id:"student", fname:"Jill", lname:"Doe", class:"HIST"}
output: file ./school/file_school.json content : {id:"student", fname:"Jill", lname:"Doe", class:"HIST"}
----------------------------------------------------------------------------------------
GET
superagent localhost:3000/school/student GET 
output: file ./school/file_school.json content : {id:"student", fname:"Jill", lname:"Doe", class:"HIST"}
----------------------------------------------------------------------------------------
DELETE
superagent localhost:3000/school/student DELETE
