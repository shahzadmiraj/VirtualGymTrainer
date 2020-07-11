<?php
$Excercise=$_GET['Excercise'];

?>

<!DOCTYPE html>
<head>
    <title>VGT|HOME</title>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

    <script src="https://kit.fontawesome.com/yourcode.js"></script>

    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="p5.js"></script>
    <script src="p5.sound.min.js"></script>
    <script src="ml5.min.js"></script>




    <!--

    //front side
    <script src="frontDumbellModel/FrontSideDumbellAi.js">   </script>
    <script src="frontDumbellModel/FunctionOFSide.js"></script>-->



    <!--<script src="RightSideDumbellModel/DumbellAI.js"></script>
    <script src="MathFunction/excerciseFunctions.js"></script>-->
    <link rel="stylesheet" type="text/css" href="style.css">
        <meta charset="utf-8">



    <style>
        body {
            background-color: #b1b1cd;

        }
        .arrow {

            border: solid black;
            border-width: 0 3px 3px 0;
            display: inline-block;
            padding: 3px;

        }
        #logo{
            margin-left: 120px;
        }
        #img1{
            border-radius: 70px;
            border: groove white;


        }
        #sets{
            width: 100px;
            height: 40px;
            font-size: 39px;
        }
        #steps{
            width: 100px;
            height: 40px;
            font-size: 39px;
        }
        #div1{
            margin-top: 10px;
            margin-left: 100px;
        }
        #div2{
            margin-top: 80px;
        }
        #curvedAngle{
            width: 200px;
            height: 40px;
            font-size: 39px;

        }
        .up {
            transform: rotate(-135deg);
            -webkit-transform: rotate(-135deg);

        }

        .down {
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }
        #div3{
            margin-top: 30px;
            margin-left: 200px;
        }
        #btn{
            margin-top: 40px;
            margin-left: 230px;
            height: 100px;

        }
    </style>

</head>

<body>
<input hidden type="text" id="Excercise" value="<?php echo $Excercise;?>">



<div class="row">


        <img src="Design/images/logo2.png" id ="logo">

</div>
    <div class="container-fluid">
        <div class ="row">
            <div class="col-6 " >
                <div  id="canvax" style="width: 800px;height: 800px;overflow: auto;background-color: #0c5460"> </div>
              <!--  <img src="Design/images/bicep_curls.png" id="img1" alt="Girl in a jacket" width="300" height="400">-->
            </div>
            <div class="col-6">
                <div class="row">
                    <div class="col-md-6">
                        <label><h2>SETS:</h2></label>
                        <input type="number" id="sets" value=0>
                    </div>
                    <div class="col-md-6">
                        <label><h2>STEPS:</h2></label>
                        <input type="number" id="steps" value=0>
                    </div>

                </div>
                <div id ="div1" class="row">
                    <h1 style="font-size:24px;">Time Taken:
                        <h1 id="timetaken">

                        </h1>

                        <h3>    <span id="hour"></span>
                            <label>:</label>
                            <span id="minute"></span>
                            <label>:</label>
                            <span id="seconds"></span>
                        </h3>
                    </h1>
                </div>



                <div class ="row">
                    <div class="container">
                        <p><h3>Angle: </h3></p>
                        <div class="progress " style="height: 5vh;">
                            <div id="progressBar" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="1" aria-valuemin="30" aria-valuemax="200" style="width:100%">
                                100
                            </div>

                        </div>
                    </div>
                </div>
                <div id="div2" class="row text-center border-info">
                    <h1> Current Angle:<input type="number" id="currentAngle"> </h1>

                </div>
                <div id ="arrow" class="row">
                    <i class="fa fa-arrow-down fa-5x text-warning" aria-hidden="true"></i>
                </div>

                <div class="row">
                        <h1  id="text" class="">Lets start </h1>
                </div>

            </div>

        </div>
    </div>

    </body>
    <script type="text/javascript">





    </script>


<script src="MathFunction/angleCalculation.js"></script>
<script src="MathFunction/fixangles.js"></script>

<script src="PoseNetInitialization.js"></script>

<!--<script src="leftSideDumbellModel/leftSideDumbell.js"></script>
<script src="leftSideDumbellModel/leftSideFunction.js"></script>-->


<?php

if($Excercise=="Left_side_bicep")
{
    echo '<script src="leftSideDumbellModel/leftSideDumbell.js"></script>
<script src="leftSideDumbellModel/leftSideFunction.js"></script>';
}
else
{
    echo '<script src="RightSideDumbellModel/DumbellAI.js"></script>
    <script src="MathFunction/excerciseFunctions.js"></script>';
}
?>



</body>
</html>