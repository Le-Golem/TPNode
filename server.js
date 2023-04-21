const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const dayjs = require('dayjs');
const {parse} = require("querystring");

// require('dotenv').config();

// const dbHost = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;

// console.log(dbHost + " dbHost")
// console.log(dbPort + " dbPort")

const hostname = "127.0.0.1";
const port =3000;


const students = [
    { name : "Sonia", birth : "2019-14-05"},
    { name : "Antoine", birth : "2000-12-05"},
    { name : "Alice", birth : "1990-14-09"},
    { name : "Sophie", birth : "2001-10-02"},
    { name : "Bernard", birth : "1980-21-08"}
];


const server = http.createServer((req, res) => {
    
    let test = students.map(student => {

        const dateObj = dayjs(student.birth);
        student.birth = dateObj.format('DD-MM-YYYY');

        return student

      });
      console.log(test)
      
    // console.log(test)

    switch (req.url) {

        case '/style' :

        const cssFile = fs.readFileSync('assets/css/style.css', 'utf8');
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(cssFile);
        res.end();

        case '/delete' :
            
        case '/Form':
            let body = '';
            req.on('data', chunk => {
               body += chunk.toString();

            });
            req.on('end', () => {

                const formData = parse(body)

                const template = fs.readFileSync('./view/home.ejs', 'utf-8');
                const html = ejs.render(template);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(html);
                // console.log(formData)

                if (formData.nom != undefined && formData.date_naissance != undefined) {
                    students.push({name:formData.nom, birth:formData.date_naissance})
                }
                // console.log(students)
                res.end();
            });
            break;
        case '/students':
                 const studentstemplate = fs.readFileSync('./view/students.ejs', 'utf-8');
                 const studentshtml = ejs.render(studentstemplate, { students });
                  res.writeHead(200, { 'Content-Type': 'text/html' });
                  res.write(studentshtml);
                  res.end();
            break;
    }
}); 

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
  });