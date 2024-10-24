const Medicine = require('../models/Medicine');

exports.getMedicines = (req, res) => {
  Medicine.getAll((err, results) => {
    if (err) throw err;
    res.render('medicines', { medicines: results });
  });
};

exports.addMedicine = (req, res) => {
  const medicineData = req.body;
  Medicine.create(medicineData, (err) => {
    if (err) throw err;
    res.redirect('/medicines');
  });
};

exports.updateMedicine = (req, res) => {
  const { id } = req.params;
  const medicineData = req.body;
  Medicine.update(id, medicineData, (err) => {
    if (err) throw err;
    res.redirect('/medicines');
  });
};

exports.deleteMedicine = (req, res) => {
  const { id } = req.params;
  Medicine.delete(id, (err) => {
    if (err) throw err;
    res.redirect('/medicines');
  });
};
