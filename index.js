const express = require('express');
const cors = require('cors'); // Додайте цей рядок
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors()); // Додайте цей рядок
app.use(express.json());

// Читання JSON-файлу
function readData() {
  const rawData = fs.readFileSync('data.json');
  return JSON.parse(rawData);
}

// Запис JSON-даних у файл
function writeData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync('data.json', jsonData);
}

// Отримати всі дані
app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// Отримати дані за ID
app.get('/api/data/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const item = data.find(item => item.id === parseInt(id));
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Змінити дані за ID
app.put('/api/data/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.findIndex(item => item.id === parseInt(id));

  if (index !== -1) {
    data[index] = req.body; // Перезаписати дані
    writeData(data); // Записати зміни у файл
    res.json({ message: 'Item updated successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
