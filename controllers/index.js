const { findAll } = require("./post");

const controllers = {
  PostController: {
    findAll,
  },
};

module.exports = controllers;
