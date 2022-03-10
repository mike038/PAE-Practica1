const app = require('./app');
const port = process.env.PORT || 3000;
const authRouter = require('./routes/auth.route');
const profileRouter = require('./routes/profile.routes');

app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.listen(port, () => console.log(`Listening on localhost:${port}/`));