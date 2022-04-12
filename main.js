song="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preLoad(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(500,600);
    canvas.center();

    video =  createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded(){
    console.log("PoseNet is initialized")
}

function draw(){
    image(video,0,0,500,600);
    fill("#4b0082");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
    {
      circle(rightWristX,rightWristY,20);
    

    if(rightWristY > 0 && rightWristY < 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }

    else if(rightWristY > 100 && rightWristY < 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1.0x";
        song.rate(1.0);
    }

    else if(rightWristY > 200 && rightWristY < 300)
    {
        document.getElementById("speed").innerHTML = "speed = 2.0x";
        song.rate(2.0);
    }

    else if(rightWristY > 300 && rightWristY < 400)
    {
        document.getElementById("speed").innerHTML = "speed = 3.0x";
        song.rate(3.0);
    }

    else if(rightWristY > 400 && rightWristY < 500)
    {
        document.getElementById("speed").innerHTML = "speed = 4.0x";
        song.rate(4.0);
    }
}

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimal/1000;
    volume = leftWristY_divide_1000*2;
    document.getElementById(volume).innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+righttWristX+"rightWristY = "+rightWristY);
    }
}