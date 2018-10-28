const initialize = (data) => {
  const {
    app,
    bodyParser,
    routes
  } = data;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', routes);
}

module.exports = initialize;