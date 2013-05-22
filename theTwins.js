// Start code for the Twins robot

//FightCode can only understand your robot
//if its class is called Robot
var Robot = function(robot){
    robot.turnLeft(robot.angle % 90);
    robot.turnGunRight(90);
    robot.clone();
    this.direction = 1;
};
Robot.prototype.onIdle = function(ev) {
    var robot = ev.robot;
    robot.ahead(1);
    if (robot.parentId) {
      if (robot.cannonRelativeAngle > 270 || robot.cannonRelativeAngle < 90) {
        this.direction *= -1;
      }
      robot.turnGunRight(this.direction);
      //robot.turnGunRight(180);
      //robot.turnGunRight(-180);
    }
  
};
Robot.prototype.onWallCollision = function(ev) {
  var robot = ev.robot;
  robot.turnRight(ev.bearing + 90);

};
Robot.prototype.onRobotCollision = function(ev) {
  var robot = ev.robot, collidedRobot = ev.collidedRobot;
  robot.ignore('onRobotCollision')
  if (ev.bearing > -90 && ev.bearing < 90) {
    robot.back(100);
  } else {
    robot.ahead(100);
  }

  if (robot.id != collidedRobot.parentId && robot.parentId != collidedRobot.id) {
      robot.turnGunRight(ev.bearing - robot.cannonRelativeAngle);
      robot.turnGunLeft(ev.bearing - robot.cannonRelativeAngle);
  }
  robot.listen('onRobotCollision')
};
Robot.prototype.onHitByBullet = function(ev) {

};
Robot.prototype.onScannedRobot = function(ev) {
  var robot = ev.robot, scannedRobot = ev.scannedRobot;
  if (robot.id == scannedRobot.parentId || robot.parentId == scannedRobot.id) {
      return;
  }
  robot.fire();

};
