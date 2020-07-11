

let accuracyOfPoseNet=10;
var Previouse_Angle_Between_RightWrist_RightShoulder=200;
var stepDirection="UpWordDirection";
var InitialMovement="YesInitialMovement";

var CountOfPerfectStep=0;
var CountOfPerfectSets=0;
var CountOfWarningMovingArm=0;
var previousText="";
var textString="";
var Angle_Between_RightWrist_RightShoulder=0;
var StartExcercise="";

$(document).ready(function () {
    textarea= $("#text").html("<span class='btn-primary'>Start Move up</span>");
});



function draw()
{

    background(255);
    // video.loadPixels();
    var xScale=0;
    image(video, 0, 0, video.width, video.height);
    // image(video,0-xScale,0,video.width,video.height);
    if(pose)
    {
        // console.log(pose);


        textString="";

        if((pose.rightHip.confidence*100>accuracyOfPoseNet)&&(pose.rightShoulder.confidence*100>accuracyOfPoseNet)&&(pose.rightElbow.confidence*100>accuracyOfPoseNet)&&(pose.rightWrist.confidence*100>accuracyOfPoseNet))
        {
            //good accuracy os pose net





            var standing = Math.abs( findANGLEComplete(pose.rightHip.x, pose.rightHip.y, pose.rightShoulder.x, pose.rightShoulder.y));


            if ((standing > 75) && (standing <109))
            {
                //user is  staight position

                //textString="Good Standing position=" + standing+'",";

                var  ArmISStill = Math.abs(findANGLEComplete(pose.rightElbow.x, pose.rightElbow.y, pose.rightShoulder.x, pose.rightShoulder.y));



                if((ArmISStill > 70) && (ArmISStill < 115))
                {
                    //arm is still there position

                    // textString+=",good ARM,";

                    if(IsArmMoveCorrectlyInExcercise())
                    {
                        //user arm is in the excercise



                        if(stepDirection=="UpWordDirection")
                        {
                            // moving arm upword direction


                            if(InitialMovement=="YesInitialMovement")
                            {
                                // initial point set to 170 angle first

                                if(IsAngleTouchHip())
                                {
                                    StartExcercise="<br>Let Start Excercise<br>";
                                    //user doing arm excercise properly
                                    if(IsCurrentAngleIncrease()==false)
                                    {

                                        InitialMovement="NoInitialMovement";
                                        CountOfWarningMovingArm=0;
                                    }
                                    else
                                    {
                                        Previouse_Angle_Between_RightWrist_RightShoulder=Angle_Between_RightWrist_RightShoulder;
                                        SetInitialPosition("Error");
                                    }

                                }
                                else
                                {
                                    //user is not doing arm excercise properly
                                    textString+="<br>Move straight arm toword hip "+Angle_Between_RightWrist_RightShoulder;
                                    SetInitialPosition("Error");
                                }

                            }
                            else
                            {
                                // not initial position  in upword direction
                                if(IsCurrentAngleIncrease()==false)
                                {
                                    //angle improve itself by degree decrease when user move arm upward
                                    if(IsAngleTouchShoulder())
                                    {
                                        // if user arm get  peak angle now start move down word direction
                                        textString+="<br>Now Move Down Worddddddd ";
                                        stepDirection="DownWordDirection";
                                        InitialMovement="YesInitialMovement";
                                        CountOfWarningMovingArm=0;

                                        $(document).ready(function () {
                                            $('#arrow').html('<i class="fa fa-arrow-down fa-5x text-warning" aria-hidden="true"></i>');
                                        });

                                    }
                                    else
                                    {

                                        // if user arm does not  get peak angle now start moving up word direction
                                        textString+="<br>Good Move Upword "+Angle_Between_RightWrist_RightShoulder;
                                        CountOfWarningMovingArm=0;

                                        $(document).ready(function () {
                                            $('#arrow').html('<i class="fa fa-arrow-up fa-5x text-primary" aria-hidden="true"></i>');
                                        });

                                    }
                                    Previouse_Angle_Between_RightWrist_RightShoulder=Angle_Between_RightWrist_RightShoulder;

                                }
                                else if(IsMarginApplyAtUpdirection())
                                {
                                    //user move down word arm or still contant position does not improve angle
                                    warningOrError();
                                }
                                else
                                {
                                    //if user move full downward direction then initial position set
                                    textString+="<br> Please agian start Excercise Due to Completely wrong Down word direction,";
                                    SetInitialPosition("Error");
                                }



                            }

                        }
                        else
                        {


                            MovingArmDownwordDirection();

                            // moving arm downword direction
                            //  textString+="<br>moving arm downword direction ,"+ArmISStill;

                        }

                    }
                    else
                    {
                        //user is not doing arm excercise properly
                        textString+="<br>elbow angle out of excercise,"+Angle_Between_RightWrist_RightShoulder;
                        SetInitialPosition("Error");
                    }


                }
                else
                {
                    //user arm is inword or outword
                    textString+="<br> bad ARM is moving inword or outword"+ArmISStill;
                    SetInitialPosition("Error");
                }
            }
            else
            {
                //user is not staight position
                textString="<br> bad Standing position,"+standing;
                SetInitialPosition("Error");
            }
        }
        else
        {
            //posenet accuracy is not good

            PoseNetCalculateAccuracy();

        }




        //  text.html(StartExcercise+"<br>"+textString+"  Step ="+CountOfPerfectStep); //append

        $(document).ready(function ()
        {

            if(textString.includes("Pose Net"))
            {
                $("#text").html("<span class='btn-info'>"+textString+"</span>");
            }
            else if(textString.includes("Start again"))
            {
                $("#text").html("<span class='btn-danger'>"+textString+"</span>");
            }
            else if(textString.includes("Warning"))
            {
                $("#text").html("<span class='btn-warning'>"+textString+"</span>");
            }
            else
            {
                $("#text").html("<span class='btn-primary'>"+textString+"</span>");
            }


            $("#currentAngle").val(Angle_Between_RightWrist_RightShoulder);

            $('#progressBar').attr('aria-valuenow', 180-Angle_Between_RightWrist_RightShoulder).css('width', 180-Angle_Between_RightWrist_RightShoulder+'%');
            //   $("#progressBar").width(Angle_Between_RightWrist_RightShoulder+"%");
            $("#progressBar").text(180-Angle_Between_RightWrist_RightShoulder+"%");
        });
        for(let i=0;i<pose.keypoints.length;i++)//15
        {
            let x=pose.keypoints[i].position.x;
            let y=pose.keypoints[i].position.y;


            fill(0,0,200);
            ellipse(x-xScale,y,16,16);

        }
        for(let i=0;i<skeleton.length;i++)
        {
            let a=skeleton[i][0];
            let b=skeleton[i][1];
            strokeWeight(2);
            stroke(200);
            line(a.position.x-xScale,a.position.y,b.position.x-xScale,b.position.y);
        }
    }

}


function MovingArmDownwordDirection()
{

    // moving arm upword direction

    if(InitialMovement=="YesInitialMovement")
    {
        // initial point set to 90 angle first

        if(IsCurrentAngleIncrease()==false)
        {
            //still user move upword direction

            textString+="<br>Please Move Downword "+Angle_Between_RightWrist_RightShoulder;


        }
        else
        {
            //now user move downword direction

            textString+="<br>Move Downword "+Angle_Between_RightWrist_RightShoulder;
            InitialMovement="NoInitialMovement";
            CountOfWarningMovingArm=0;

        }

        $(document).ready(function () {
            $("#div3").html('<i class="fa fa-arrow-down fa-5x text-warning" aria-hidden="true"></i>');
        });


    }
    else
    {
        // not initial position of downword direction
        if(IsCurrentAngleIncrease()==true)
        {
            //angle improve itself by degree increase when user move arm downword
            if(IsAngleTouchHip())
            {
                // if user arm get  peak angle now start move up word direction
                textString+="<br>Now Move Up Word Direction ";
                SetInitialPosition("NotError");
                //Previouse_Angle_Between_RightWrist_RightShoulder=200;
                CountOfPerfectStep=CountOfPerfectStep+1;
                // textString+="<br>Hurrrrrryyyy  "+CountOfPerfectStep;

                $(document).ready(function () {
                    $("#steps").val(CountOfPerfectStep);
                    if(CountOfPerfectStep>11)
                    {
                        CountOfPerfectStep=0;
                        CountOfPerfectSets=CountOfPerfectSets+1;
                        $("#sets").val(CountOfPerfectSets);
                    }

                });
            }
            else
            {

                // if user arm does not  get peak angle now start moving up word direction
                textString+="<br>Good Move Downword "+Angle_Between_RightWrist_RightShoulder;
                CountOfWarningMovingArm=0;


                $(document).ready(function () {
                    $("#div3").html('<i class="fa fa-arrow-down fa-5x text-warning" aria-hidden="true"></i>');
                });

            }
            Previouse_Angle_Between_RightWrist_RightShoulder=Angle_Between_RightWrist_RightShoulder;



        }
        else if(IsMarginApplyAtDowndirection())
        {
            //user move down word arm or still contant position does not improve angle
            warningOrError();
        }
        else
        {
            //if user move full downward direction then initial position set
            textString+="<br> Please agian start Excercise Due to Completely wrong up word direction,";
            SetInitialPosition("Error");
        }

    }



}
