'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/register', controller.user.register);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // Obtain user information
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // Modify user's personality signature
  router.post('/api/user/modify_pass', _jwt, controller.user.modifyPass); // Change user password
  router.get('/api/type/list', _jwt, controller.type.list); // Get a list of consumption types
  router.get('/api/bill/list', _jwt, controller.bill.list); // Get a list of bills
  router.post('/api/bill/add', _jwt, controller.bill.add); // Add Billing
  router.get('/api/bill/detail', _jwt, controller.bill.detail); // Get details
  router.post('/api/bill/update', _jwt, controller.bill.update); // Billing Updates
  router.post('/api/bill/delete', _jwt, controller.bill.delete); // Get details
  router.get('/api/bill/data', _jwt, controller.bill.data); // Get Data
  router.get('/api/note/list', _jwt, controller.note.list); // Get a list of notes
  router.post('/api/note/add', _jwt, controller.note.add); // Add notes
  router.post('/api/note/delete', _jwt, controller.note.delete); // Delete Notes
  router.post('/api/note/update', _jwt, controller.note.update); // Revision Notes
  router.post('/api/upload', _jwt, controller.upload.upload); // Upload images

  router.post('/api/user/verify', controller.user.verify); // Verify token
};