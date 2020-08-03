
        // var jqXHR = $.ajax({
        //     async: false,
        //     url: "/getquest",
        //     dataType: 'json'
        //     });
    


    questions = question.question;
    var questionCounter = 0; //Tracks question number
    var quiz = $('#quiz'); //Quiz div object
    var t = 0;
    var showt = 0;
    var Clicked = false;
    var Answer_Choosed = 0;
    var score = 0;
    Dques();


    function reset(){
        t=0;
        Clicked = false;
        Answer_Choosed = 0;
    }

    setInterval(
    function leader(){
        document.getElementById("lead-body").innerHTML = "";
        for (k = 0; k < Leaders.length; k++) {
            document.getElementById("lead-body").innerHTML+=`
            <tr>
            <td class="center-align">${Leaders[k].rank}</td>
            <td class="center-align">${Leaders[k].username}</td>
            <td class="center-align">${Leaders[k].score}</td>
            <td class="center-align">${Leaders[k].status}</td>
            </tr>
            `
            };
    },5000);


        
    function Dques(){
        reset();
        if (questionCounter < questions.length){
        document.getElementById("quiz").innerHTML = `
        <img src="${questions[questionCounter].question_img}" width="100%">
        `
        document.addEvent
        
        document.getElementById("currentQ").innerHTML = `
        ${questionCounter+1}/${questions.length} 
        `

        options();
        document.getElementById("progress").style.width = 0 + "%";
        timer();
        }
        else{
            document.getElementById("details-col").style.display = "none";
            document.getElementById("question-col").style.display = "none";
            document.getElementById("result-col").style.height = "100%";
            document.getElementById("result-card").innerHTML = `<h4 align="center">Your Score is ${score}</h4>`

        }
    }

    
    function options(){
        $("#opt").html('');
        for (let i = 1; i <= questions[questionCounter].num_opt ; i++) { 
            $("#opt").append( `
            <a class="btn optionsbtn" id="opt_btn_${i}" opt="${i}" style="width:${100/questions[questionCounter].num_opt-1.5}%;">${i}</a>
            `)

            $("#opt_btn_"+i).click(function() {
                if (Clicked == false){
                $("#opt_btn_"+i).addClass("blue");
                Clicked = true;
                Answer_Choosed = i;
                }
            });
        }
    }

    function optCheck(){
        if (Answer_Choosed==0){
            score += 0;
        }
        if (Answer_Choosed == questions[questionCounter].ans_opt){
            score += 5;
        }
        document.getElementById("myscore").innerHTML= score;
    }

    function show(){
            t=0;
            clearTimeout(TIMER);
        if (showt!=5){
            showt ++;
            SHOWT = setTimeout(function(){
                document.getElementById("progress").style.width = showt/5*100 + "%";
                document.getElementById("progress").style.background = "linear-gradient(60deg,#93ecbb,#80f07c)";
                document.getElementById("progress").innerHTML = `<p align=center> ${showt} sec</p>`;
                $("#opt_btn_"+ questions[questionCounter].ans_opt).addClass("green")
                show();
            },1000);
        }
        else{
            showt=0;
            questionCounter ++
            Dques();
            clearTimeout(SHOWT);
               
        }
    }

    function timer(){
        if (t!=questions[questionCounter].time){
            t ++;
            var scrolled =  t/questions[questionCounter].time*100;
            TIMER = setTimeout(function(){
                document.getElementById("progress").style.width = scrolled + "%";
                document.getElementById("progress").style.background = "linear-gradient(60deg,#fdad8e,#b2ffc5)";
                document.getElementById("time").innerHTML = t +"/"+questions[questionCounter].time+"sec";
                document.getElementById("progress").innerHTML = `<p align=center></p>`;
               
                timer();
            },1000);
        }
        else{
            Clicked = true;
            show();
            optCheck();
        }
    }