
function warningOrError()
{
    if(CountOfWarningMovingArm<10)
    {
        textString+="<br>Warning please when "+stepDirection+" PreviousAngle="+Previouse_Angle_Between_RightWrist_RightShoulder+"CurrentAngle="+Angle_Between_RightWrist_RightShoulder;
        CountOfWarningMovingArm=CountOfWarningMovingArm+1;
    }
    else
    {
        //if user doesnot improve angle more then 3 time warning then set initial position
        textString+="<br> Please agian start Excercise due to More then Warning Found during"+stepDirection+Previouse_Angle_Between_RightWrist_RightShoulder;
        SetInitialPosition();

    }

}

function SetInitialPosition()
{
    textString+="Again Start with  initial position,"+Angle_Between_RightWrist_RightShoulder;
    CountOfWarningMovingArm=0;
    InitialMovement="YesInitialMovement";
    stepDirection="UpWordDirection";
    StartExcercise="";
}

function IsCurrentAngleIncrease()
{
    var state=false;
    if(Previouse_Angle_Between_RightWrist_RightShoulder<Angle_Between_RightWrist_RightShoulder)
    {
        state=true;
    }
    return state;
}
function IsAngleTouchShoulder()
{

    if((Angle_Between_RightWrist_RightShoulder<50) && (Angle_Between_RightWrist_RightShoulder>30))
    {

        return true;
    }
    return false;
}
function IsAngleTouchHip()
{
    if((Angle_Between_RightWrist_RightShoulder<180) &&( Angle_Between_RightWrist_RightShoulder>120))
    {
        return true;
    }
    return false;
}
function IsArmMoveCorrectlyInExcercise()
{
    Angle_Between_RightWrist_RightShoulder= angle(pose.rightWrist.x, pose.rightWrist.y,pose.rightElbow.x, pose.rightElbow.y,pose.rightShoulder.x, pose.rightShoulder.y)[1];
    if((Angle_Between_RightWrist_RightShoulder<199) && (Angle_Between_RightWrist_RightShoulder>10))
    {
        return true;
    }
    return false;
}
function IsMarginApplyAtUpdirection()
{

    var margin=Angle_Between_RightWrist_RightShoulder-Previouse_Angle_Between_RightWrist_RightShoulder;
//   textString+="p"+Previouse_Angle_Between_RightWrist_RightShoulder+"C="+Angle_Between_RightWrist_RightShoulder+",Marging is set"+margin;
    if((margin<=3))
    {
        return true;
    }
    return false;
}
function IsMarginApplyAtDowndirection()
{

    var margin=Previouse_Angle_Between_RightWrist_RightShoulder-Angle_Between_RightWrist_RightShoulder;
    //textString+="p"+Previouse_Angle_Between_RightWrist_RightShoulder+"C="+Angle_Between_RightWrist_RightShoulder+",Marging is set"+margin;
    if((margin<=3))
    {
        return true;
    }
    return false;
}




function PoseNetCalculateAccuracy() {
    textString+="<br>Pose Net accuracy not good<br>";
    if(pose.leftHip.confidence*100<accuracyOfPoseNet)
    {
        textString+="leftHip ="+pose.leftHip.confidence*100;
    }
    if(pose.leftShoulder.confidence*100<accuracyOfPoseNet)
    {
        textString+=",leftShoulder ="+pose.leftShoulder.confidence*100;
    }
    if(pose.leftWrist.confidence*100<accuracyOfPoseNet)
    {
        textString+=",leftWrist ="+pose.leftWrist.confidence*100;
    }
}