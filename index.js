const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id:0,
        name: 'Nikola Tesla',
    },
    {
        id:1,
        name: 'Sir Isaac Newton',
    },
    {
        id:2,
        name: 'Albert Einsten',
    },
]

server.on('request', (req, res) => {
    const items = req.url.split('/');
    // /friends/2 => ['', 'friends', '2']
    if(req.method ==='POST' && items[1] === 'friends'){
        req.on('data', (data) => {
            const friend = data.toString();
            console.log('Request:', friend);
            friend.push(JSON.parse(friend));
        });
        req.pipe(res);
    }else if(req.method ==='GET' && items[1] === 'friends'){
   
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length ===3) {
        const friendindex = Number(items[2]);
        res.end(JSON.stringify(friends [friendindex]));
    }else {
        res.end(JSON.stringify(friends));
    }
    
}else if (req.method ==='GET' && items[1] ==='messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li> Hello Isaac! </li>');
    res.write('<li> What are your thoughts on astronomy? </li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
}else {
    res.statusCode = 404;
    res.end();
}
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});


// running on the javascript console for chrome
// fetch('http://localhost:3000/friends',{ method: 'POST', body: JSON.stringify({id:3, name:'harmza'})})
// .then((response) => response.json())
// .then((friend) => console.log(friend));