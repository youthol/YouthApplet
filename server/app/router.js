'use strict';

module.exports = app => {
  app.get('/', app.controller.home.index);
  /**
   * API Router
   */
  app.get('/api', app.controller.api.user.index);
  app.get('/api/user', app.controller.api.user.getUserList);
  app.get('/api/user/:uid', app.controller.api.user.getUser);
  app.post('/api/user', app.controller.api.user.createUser);
  app.put('/api/user/:uid', app.controller.api.user.putBind);
  app.delete('/api/user/:uid', app.controller.api.user.delBind);

  app.get('/api/core', app.controller.api.core.index);
  app.get('/api/core/calendar', app.controller.api.core.getCalendar);
  app.get('/api/core/score/:xh', app.controller.api.core.getScore);
  app.get('/api/core/cet', app.controller.api.core.getCET);
  app.get('/api/core/newsdut', app.controller.api.core.getNewSdut);
  app.get('/api/core/dorm', app.controller.api.core.getDorm);
  app.get('/api/core/boils', app.controller.api.core.getBoils);
  app.get('/api/core/boil', app.controller.api.core.getBoil);
  app.post('/api/core/boil/:eid', app.controller.api.core.commBoil);
  app.get('/api/core/quotes', app.controller.api.core.getQuotes);
  // app.get('/api/core/news', app.controller.api.core.getnews);
  app.post("/api/feedback", app.controller.api.user.feedback);
  /**
   * Test Router
   */
  app.get('/test', app.controller.test.index);
};