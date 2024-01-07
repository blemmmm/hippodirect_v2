import { Request, Response } from 'express';

/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const cors = require('cors');
const Typesense = require('typesense');

const app = express();
const port = process.env.PORT || 3001;

const client = new Typesense.Client({
  nodes: [
    {
      host: 'localhost', // For Typesense Cloud use xxx.a1.typesense.net
      port: '8108', // For Typesense Cloud use 443
      protocol: 'http', // For Typesense Cloud use https
    },
  ],
  apiKey: '245e26664fae4764659f444f5e15b859da00b6ac44e112169f3e89c762ab45d5',
  connectionTimeoutSeconds: 2,
});

// Define routes and middleware here

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your client's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and authentication headers
  }),
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send({ server_response: 'hello express' });
});

app.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, page } = req.query;

    // Perform a search in Typesense
    const searchResults = await client
      .collections('products')
      .documents()
      .search({
        q,
        query_by: 'name,brand',
        per_page: '20',
        sort_by: 'popularity:desc',
        page: page || 1,
      });

    res.json(searchResults.hits);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
