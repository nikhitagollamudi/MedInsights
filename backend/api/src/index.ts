import express from 'express';
import { doctorRouter } from './routes/doctorRoutes';
import { patientRouter } from './routes/patientRoutes';

const PORT : String = process.env.PORT || '8080';

const app = express();
app.use(express.json());

app.use('/doctors', doctorRouter);
app.use('/patients', patientRouter);

app.get('/', (_req, res) => {
  res.status(200).send({ status: 'UP' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});