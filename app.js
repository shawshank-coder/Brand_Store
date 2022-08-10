const express = require('express');
const app = express();
const AppError = require('./utils/appError');


const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');

app.use(express.json()); 

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/inventory', inventoryRouter);


app.all('*', (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
})

  
module.exports = app;