import express from 'express';
import { pool } from './db.js';
import { PORT } from './config.js';

const app = express();

app.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM readings');

  res.json(rows);
});
app.get('/ping', async (req, res) => {
  const [result] = await pool.query(`SELECT "hello world" as RESULT`);

  res.json(result[0]);
});

app.get('/create', async (req, res) => {
  try {
    const result = await pool.query(
      'INSERT INTO readings (SensorId, Timestamp, Value) VALUES ' +
        "(1, '2024-10-01 10:00:00', 23.5), " +
        "(2, '2024-10-01 10:05:00', 45.2), " +
        "(3, '2024-10-01 10:10:00', 12.3)"
    );

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

//app.listen(PORT);
//console.log('Server on port', PORT);
app
  .listen(PORT, () => {
    console.log('Server on port', PORT);
  })
  .on('error', (err) => {
    console.error('Error starting server:', err);
  });
