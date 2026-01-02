const fs= require('fs');
// fs.writeFile('example.txt', "Hello this was created from fs", (err) => {
//     if (err) throw err;
//     console.log('File created successfully!');
// });
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
});