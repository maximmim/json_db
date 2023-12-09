const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

function readData() {
  const rawData = fs.readFileSync('data.json');
  return JSON.parse(rawData);
}

function writeData(data) {
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync('data.json', jsonData);
}

app.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});



app.post('/', (req, res) => {
  const data = readData();
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  writeData(data);
  res.json({ message: 'Item added successfully', newItem });
});

app.put('/:id', (req, res) => {
  const data = readData();
  const id = req.params.id;
  const index = data.findIndex(item => item.id === parseInt(id));

  if (index !== -1) {
    data[index] = req.body;
    writeData(data);
    res.json({ message: 'Item updated successfully' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
