const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  exec('bin/001', (err, stdout, stderr) => {
    if (err) {
      return res.send(`Error: ${stderr}`);
    }
    return res.send(stdout);
  });
});

app.get('/aws', (req, res) => {
  exec('bin/002', (err, stdout, stderr) => {
    if (err) {
      return res.send(`Error: ${stderr}`);
    }
    return res.send(stdout);
  });
});

app.get('/docker', (req, res) => {
  exec('bin/003', (err, stdout, stderr) => {
    if (err) {
      return res.send(`Error: ${stderr}`);
    }
    return res.send(stdout);
  });
});

app.get('/loadbalanced', (req, res) => {
  const headers = JSON.stringify(req.headers);
  exec(`bin/004 '${headers}'`, (err, stdout, stderr) => {
    if (err) {
      return res.send(`Error: ${stderr}`);
    }
    return res.send(stdout);
  });
});

app.get('/tls', (req, res) => {
  const headers = JSON.stringify(req.headers);
  exec(`bin/005 '${headers}'`, (err, stdout, stderr) => {
    if (err) {
      return res.send(`Error: ${stderr}`);
    }
    return res.send(stdout);
  });
});

app.get('/secret_word', (req, res) => {
  const headers = JSON.stringify(req.headers);
  exec(`bin/006 '${headers}'`, (err, stdout, stderr) => {
    if (err) {
      return res.send(`Error: ${stderr}`);
    }
    return res.send(stdout);
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
