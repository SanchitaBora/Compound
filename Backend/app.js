const express = require('express')
const cors = require('cors');
const app = express();

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

app.post('/compounds', async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
      const compounds = await db.Book.bulkCreate(data);
      res.send(compounds);
    } catch (err) {
      res.send(err.message);
    }
  })

var fileUpload = require('express-fileupload');
app.use(fileUpload());


const convert = function (csvFile) {
    const convert = (from, to) => (str) => Buffer.from(str, from)
      .toString(to);
    const hexToUtf8 = convert('hex', 'utf8');
    let csvData = hexToUtf8(csvFile.data)
      .split('\r\n');
    console.log(csvData);
    let csvRows = [];
    csvData.forEach((data) => {
      csvRows.push(data.split(','));
    });
    let data = [];
    for (let i = 1; i < csvRows.length; ++i) {
      let dict = {};
      for (let j = 0; j < csvRows[i].length; ++j) {
        dict[csvRows[0][j]] = csvRows[i][j];
      }
      data.push(dict);
    }
    return data;
}

app.post('/compounds/File', async (req, res) => {
    if (!req.files || !req.files.file) {
      res.status(404).send('File not found');
    } else if (req.files.file.mimetype === 'text/csv') {
      let csvFile = req.files.file;
      data = convert(csvFile);
      try {
        const compound = await db.Book.bulkCreate(data);
        res.send(compound);
      } catch (err) {
        res.send(err.message);
      }
    } else {
      res.status(422).send(
            util.apiResponse(0, toast.INVALID_FILE_FORMAT, {
            err: 'File format is not valid',
          }),
        );
    }
  })

app.get('/compounds', async (req, res) => {
  try {
    const books = await db.Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving data from the database", error: err.message });
  }
});

app.delete('/compounds/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.Book.destroy({
      where: { id: id }
    });
    if (result === 0) {
      return res.status(404).json({ message: 'Compound not found' });
    }
    res.json({ message: 'Compound deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: "Error deleting the compound", error: err.message });
  }
});

app.put('/compounds/:id', async (req, res) => {
  const id = req.params.id;
  const { name, image, description } = req.body;
  try {
    const book = await db.Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Compound not found' });
    }
    book.name = name;
    book.image = image;
    book.description = description;
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error updating the compound", error: err.message });
  }
});

db.sequelize.sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log('Server started');
    })
  })
  .catch((err) => {
    console.log(err);
  })
