const initialize = (data) => {
  const {
    app,
    bodyParser,
    routes
  } = data;
  app.use(bodyParser.json());
  app.use('/', routes);
}

module.exports = initialize;