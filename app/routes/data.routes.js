const { authJwt } = require("../middleware");
const controller = require("../controllers/data.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/feedback/post",
        controller.getFeedback
    );
    app.get(
      "/api/feedback/posts",
      controller.getFeedbacks
    );

    app.get(
      "/api/feedback/vote",
      controller.getIfUserVote
    );

    app.post(
      "/api/feedback/vote",
      [authJwt.verifyToken],
      controller.vote
    );

    app.delete(
      "/api/feedback/unvote",
      [authJwt.verifyToken],
      controller.unVote
    );
}