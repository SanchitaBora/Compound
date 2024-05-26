const express = require('express')
const app = express();
const PORT = 3000;

const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

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

db.sequelize.sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log('Server started');
    })
  })
  .catch((err) => {
    console.log(err);
  })