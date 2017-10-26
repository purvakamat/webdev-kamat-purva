/**
 * Created by kamat on 10/24/2017.
 */

module.exports = function (app) {
  require("./services/user.service.server")(app);
  //require("./services/widget.service.server")(app);
  require("./services/website.service.server")(app);
};
