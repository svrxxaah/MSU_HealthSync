const Service = require('../models/Service');

exports.getServices = (req, res) => {
  Service.getAll((err, results) => {
    if (err) throw err;
    res.render('services', { services: results });
  });
};

exports.addService = (req, res) => {
  const serviceData = req.body;
  Service.create(serviceData, (err) => {
    if (err) throw err;
    res.redirect('/services');
  });
};

exports.updateService = (req, res) => {
  const { id } = req.params;
  const serviceData = req.body;
  Service.update(id, serviceData, (err) => {
    if (err) throw err;
    res.redirect('/services');
  });
};

exports.deleteService = (req, res) => {
  const { id } = req.params;
  Service.delete(id, (err) => {
    if (err) throw err;
    res.redirect('/services');
  });
};
