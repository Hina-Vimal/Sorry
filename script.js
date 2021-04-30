const questionDB = [
    {
        "q":"Do you still love him?",
        "res":""
    },
    {
        "q":"Is he cute?",
        "res":""
    },
    {
        "q":"Do you want to beat him?",
        "res":""
    },
    {
        "q":"Do you want him to love you more?",
        "res":""
    }
]; 

var counter = 0;

getFinishHtml = (yes, no) =>{
    var item = '<div>';
    if(no > 0){
        item += '<label>Out of '+questionDB.length+', You said No '+no+' times.</label><br/><img src="https://i.pinimg.com/originals/f8/b3/db/f8b3db87172ff5ecb0c9f5989c0fa273.png"></img>';
    }
    else{
        item += '<label>Finally!!!.</label><br/><img src="https://i.pinimg.com/originals/e1/fa/f5/e1faf5f31cccd10a1fdadf09197acb38.gif"></img>';
    }
    item += '</div>';
    return item;
}

finish = () =>{
    var yesItem = 0;
    var noItem = 0;
    questionDB.forEach(element => {
        if(element['res'] === "Yes"){
            yesItem++;
        }
        if(element['res'] === "No"){
            noItem++;
        }
    });
    $('.container').append(getProgressBar((counter/questionDB.length)*100));
    $('.container').append('<div style="border:1px solid black;">'+getFinishHtml(yesItem,noItem)+'</div>');
    $(".container").fadeIn(3000);
    $('#start').hide();
}

process = (e) =>{
    if(e == "start"){
        var item = getNextQuestion(counter);
        $('.container').empty();
        $('.container').append(getProgressBar((counter/questionDB.length)*100));
        $('.container').append('<div style="border:1px solid black;">'+getQuestionHTML(item)+'</div>');
        $(".container").fadeIn(3000);
        $('#start').hide();
    }

    else if(e == "Yes"){
        $('.container').empty();
        questionDB[counter].res = "yes";
        counter++;
        if(questionDB[counter] === undefined){
            finish();
            return;
        }
        $('.container').append(getProgressBar((counter/questionDB.length)*100));
        var item = getNextQuestion(counter);
        $('.container').append('<div style="border:1px solid black;">'+getQuestionHTML(item)+'</div>');
        $(".container").fadeIn(3000);
        $('#start').hide();
    }
    else if(e == "No"){
        $('.container').empty();
        questionDB[counter].res = "No";
        counter++;
        if(questionDB[counter] === undefined){
            finish();
            return;
        }
        $('.container').append(getProgressBar((counter/questionDB.length)*100));
        var item = getNextQuestion(counter);
        $('.container').append('<div style="border:1px solid black;">'+getQuestionHTML(item)+'</div>');
        $(".container").fadeIn(3000);
        $('#start').hide();
    }   
}


getQuestionHTML = (ques) =>{
    var struct = "<div>";
    struct += "<h3> "+ ques.q + "</h3>";
    struct += '<button type="button" id="Yes" class="btn btn-primary" onclick="process(this.id);">Yes</button> <button type="button" id="No" class="btn btn-danger" onclick="process(this.id);">No</button>';
    struct +="</div>";
    return struct;
}

getProgressBar = (progress) => {
    return '<div class="progress"> <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width:'+progress+'%"> '+ progress+'% completed </div></div>';
}

getNextQuestion = (counter) =>{
    return questionDB[counter];
}

