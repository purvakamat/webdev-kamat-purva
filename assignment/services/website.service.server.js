/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {
  app.get("/api/user/:userId/website", findWebsitesForUser);

  function findWebsitesForUser(req, res) {

  }
};
