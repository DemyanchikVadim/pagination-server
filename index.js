import express from 'express';
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

const elements = [];

for (let i=0, t=2000; i<t; i++) {
  elements.push(Math.round(Math.random() * t))
}

//http://localhost:8080/api/elements/?limit=10&offset=0
app.get(`/api/elements`, (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  res.send({ elements: elements.slice(offset, limit), total: elements.length });
});

app.use((req, res) => {
  res.status(404).json({
  errors: {
    global: 'Api method not found',
  },
  });
});

const server = app.listen(8080, () =>
  console.log('Server is up and running on port localhost:8080'),
);
