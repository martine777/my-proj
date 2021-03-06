import { Router } from 'express';

const models = require('require-all')({
  dirname: __dirname + '/../../models',
  filter: /^([^\.].*)\.(ts|js)$/
});

export default function (router: Router) {

  Object.keys(models).forEach((name) => {
    console.log(`Add REST ${name}`);
    const model = models[name].default;

    router.route('/' + name + 's')
      // C
      .post((req, res) => {
        var m = new model();
        Object.assign(m, req.body);
        m.save((err) => {
          if (err) {
            res.json({ error: err });
          } else {
            res.json(m);
          }
        });
      })
      // R
      .get((req, res) => {
        model.find((err, ms) => {
          if (err) {
            res.json({ error: err });
          } else {
            res.json(ms);
          }
        });
      });

    router.route('/' + name + 's/:_id')
      // R
      .get((req, res) => {
        model.findById(req.params._id, (err, m) => {
          if (err) {
            res.json({ error: err });
          } else {
            res.json(m);
          }
        });
      })
      // U
      .put((req, res) => {
        model.findById(req.params._id, (err, m) => {
          if (err) {
            res.json({ error: err });
            return;
          }
          Object.assign(m, req.body);
          m.save((err) => {
            if (err) {
              res.json({ error: err });
            } else {
              res.json(m);
            }
          });
        });
      })
      // D
      .delete((req, res) => {
        model.remove({
          _id: req.params._id
        }, (err) => {
          if (err) {
            res.json({ error: err });
          }
        });
      });

  });

};
