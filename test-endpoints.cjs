const http = require('http');

const postData = JSON.stringify({ username: 'admin2', password: 'admin123' });
const loginOpts = {
  hostname: 'localhost', port: 3001, path: '/api/auth/login', method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
};

const loginReq = http.request(loginOpts, (loginRes) => {
  let loginData = '';
  loginRes.on('data', (chunk) => loginData += chunk);
  loginRes.on('end', () => {
    if (loginRes.statusCode !== 200) {
      console.log('Login failed:', loginRes.statusCode, loginData);
      return;
    }
    const token = JSON.parse(loginData).token;
    console.log('Login OK');

    const endpoints = [
      '/api/pegawai?page=1&limit=10', '/api/user?page=1&limit=10', '/api/role',
      '/api/activity?page=1&limit=10', '/api/dashboard', '/api/master/jabatan',
      '/api/master/departemen', '/api/master/wilayah', '/api/tunjangan/transport'
    ];

    let i = 0;
    function testNext() {
      if (i >= endpoints.length) return;
      const ep = endpoints[i++];
      http.get({ hostname: 'localhost', port: 3001, path: ep, headers: { 'Authorization': 'Bearer ' + token } }, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            const j = JSON.parse(data);
            const dataInfo = j.data
              ? (Array.isArray(j.data) ? 'array[' + j.data.length + ']' : 'object')
              : 'null';
            const pagination = j.pagination
              ? 'page=' + j.pagination.page + '/' + j.pagination.totalPages + ' total=' + j.pagination.total
              : '';
            console.log('[' + res.statusCode + '] ' + ep + ' -> ' + dataInfo + ' ' + pagination);
          } catch(e) {
            console.log('[' + res.statusCode + '] ' + ep + ' -> ERROR: ' + data.substring(0, 200));
          }
          testNext();
        });
      }).on('error', (e) => {
        console.log(ep + ' -> error: ' + e.message);
        testNext();
      });
    }
    testNext();
  });
});
loginReq.on('error', (e) => console.error('Login error:', e.message));
loginReq.write(postData);
loginReq.end();
