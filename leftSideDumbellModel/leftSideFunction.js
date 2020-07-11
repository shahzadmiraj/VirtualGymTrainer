
    function warningOrError()
    {
        if(CountOfWarningMovingArm<10)
        {
            textString+="<br> Warning not moving arm";
            CountOfWarningMovingArm=CountOfWarningMovingArm+1;
        }
        else
        {
            //if user doesnot improve angle more then 3 time warning then set initial position
            textString+="<br> Please agian start Excercise due to More then Warning Found during"+stepDirection+Previouse_Angle_Between_RightWrist_RightShoulder;
            SetInitialPosition();

        }

    }

    function SetInitialPosition(error)
    {

        textString+="<br> Start again <br>";
        CountOfWarningMovingArm=0;
        InitialMovement="YesInitialMovement";
        stepDirection="UpWordDirection";
        StartExcercise="";

        $(document).ready(function () {

            if(error=="Error")
            {
                $('#arrow').html('<i class="fa fa-arrow-down fa-5x text-danger" aria-hidden="true"></i>');
            }
            else
            {
                $('#arrow').html('<i class="fa fa-arrow-up fa-5x text-primary" aria-hidden="true"></i>');
            }

        });


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



        Angle_Between_RightWrist_RightShoulder= angle(pose.leftWrist.x, pose.leftWrist.y,pose.leftElbow.x, pose.leftElbow.y,pose.leftShoulder.x, pose.leftShoulder.y)[1];

        if((Angle_Between_RightWrist_RightShoulder<180) && (Angle_Between_RightWrist_RightShoulder>30))
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


        textString+="<br> Pose Net accuracy not good<br>";

                //Left_side_bicep
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
