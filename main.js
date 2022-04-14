prediction = "";
webcam.set({
    width: 350,
    height: 300,
    image_format: "jpg", 
    jpg_quality: 100,
});
var webcam = document.getElementById("webcam");
webcam.attach("webcam");

function capture(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML= '<img src="'+data_uri+'" id="snapshot">';
    });
}
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/aF35EtF--/model.json', modelLoaded);
function modelLoaded(){
    console.log("modelLoaded");
}
function check(){
    var img = document.getElementById("result");
    classifier.classify(img, gotResult);
}
function gotResult(error, result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        prediction = result[0].label;
        document.getElementById("gesture1").innerHTML= prediction;
        speak();
        if(prediction =="Victory"){
            document.getElementById("gesture1").innerHTML = "&#9996;";
        }
        else if (prediction == "Good"){
            document.getElementById("gesture1").innerHTML = "&#128076;";
        }
        else if (prediction == "Thumbs Up"){
            document.getElementById("gesture1").innerHTML = "&#128077;";
        }
        else if (prediction == "Thumbs Up"){
            document.getElementById("gesture1").innerHTML = "Finger Heart";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak1 = "The gesture is "+ prediction;
    var utterThis = new SpeechSynthesisUtterance(speak1);
    synth.speak(utterThis);
}