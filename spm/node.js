const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = []; // 模擬資料庫

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.status(201).send('註冊成功');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, 'secretkey');
    res.json({ token });
  } else {
    res.status(401).send('登入失敗');
  }
});

app.listen(port, () => {
  console.log(`會員系統運行於 http://localhost:${port}`);
});
