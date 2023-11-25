

import express from 'express';
// import userRoutes from './userRoutes';
import authRoutes from './auth.route';
const appRoutes = express.Router();
// });
app.use('/auth', authRoutes);
// appRoutes.use('/users', userRoutes);


export default appRoutes;