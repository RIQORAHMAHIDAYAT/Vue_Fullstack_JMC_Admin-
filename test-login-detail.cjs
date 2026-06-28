const http = require('http');
const pd = JSON.stringify({username:'superadmin',password:'superadmin123'});
const r = http.request({
  hostname: 'localhost', port: 3000,
  path: '/api/auth/login', method: 'POST',
  headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(pd)}
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    console.log('SET-COOKIE:', JSON.stringify(res.headers['set-cookie']));
    const j = JSON.parse(d);
    console.log('USER:', JSON.stringify(j.user));
    console.log('TOKEN:', !!j.token);
    console.log('PERMS COUNT:', j.permissions && j.permissions.length);
  });
});
r.on('error', e => console.log('ERR:', e.message));
r.write(pd);
r.end();
