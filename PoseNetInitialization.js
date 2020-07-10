

let video;
let poseNet;
let pose;
let skeleton;
let text;
//let inputNames = ["noseX","noseY","leftEyeX","leftEyeY","rightEyeX","rightEyeY", "leftEarX","leftEarY", "rightEarX","rightEarY", "leftShoulderX","leftShoulderY", "rightShoulderX","rightShoulderY", "leftElbowX","leftElbowY","rightElbowX","rightElbowY","leftWristX","leftWristY","rightWristX","rightWristY","leftHipX","leftHipY","rightHipX","rightHipY","leftKneeX","leftKneeY","rightKneeX","rightKneeY","leftAnkleX","leftAnkleY","rightAnkleX","rightAnkleY"]
var canvas;

function setup()
{
    text=createElement('h1', 'start');
    canvas=createCanvas(1000,800);
    canvas.parent('canvax');
   background(51);
  //video = createVideo("../../videos/Bicep_Curls.mp4");//Bicep_Curls.mp4,"../../videos/Bicep_Curls.mp4"

     //video = createVideo("videos/frontside1.mp4");
   video =  createCapture(VIDEO);
   // video = createVideo("../../videos/myOwn.mp4");

    video.size(1000,800);
   video.hide();
    poseNet=ml5.poseNet(video,modelLoad);
    poseNet.on('pose',getPoses);

}
function modelLoad()
{
    console.log('pose net model is ready');
}
function getPoses(poses)
{
    if((poses.length>0))
    {
        pose=poses[0].pose;
        skeleton=poses[0].skeleton;
        for(let i=0;i<pose.keypoints.length;i++)
        {
            let x=pose.keypoints[i].position.x;
            let y=pose.keypoints[i].position.y;
        }

    }
}

