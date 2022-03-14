PennController.ResetPrefix()


Sequence("consent_form", "introduction", "instruction", "example", "instruction_practice", "practice", "instruction_exit", shuffle(randomize("experiment")), "exit_form", "exit");


function getRandomStr(){
    const LENGTH = 4
    const SOURCE = "abcdefghijklmnopqrstuvwxyz"
    let result = ''

    for(let i=0; i<LENGTH; i++){
        result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }

  return result
}



// Generate a subject ID
const subject_id = getRandomStr()



newTrial("consent_form",
    newHtml("consent", "consent.html")
        .settings.checkboxWarning("Required")
        .settings.radioWarning("Required")
        .settings.inputWarning("Required")
        .print()
        .log()
    ,
    newButton("I agree to participate in this study")
        .print()
        .wait(
            getHtml("consent").test.complete()
            .failure( getHtml("consent").warn() ))
).setOption("hideProgressBar", true);



newTrial("introduction",
    newHtml("introduction.html")
        .print()
    ,
    newButton("Proceed")
        .print()
        .wait()
).setOption("hideProgressBar", true);


newTrial("instruction",
    newHtml("instruction.html")
        .print()
    ,
    newButton("See examples")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);


// Example
Template(
    GetTable("intro_trials.csv")
        .filter("block", "example")
    , row =>
    newTrial("example" ,
        newText("sentence_1", row.s1)
            .print()
        ,
        newText("sentence_2", row.s2)
            .print()
        ,
        newText("sp1","<br>")
            .print()
        ,
        newText("Which one is more natural?<br><br>")
            .print()
        ,
        newText("both_p","Both are equally natural.")
        ,
        newText("a_p","A is more natural.")
        ,
        newText("b_p","B is more natural.")
        ,
        newText("n_p","Neither is natural.")
        ,
        getText(row.answer)
            .color("red")
        ,
        newScale("Scale", "both_p","a_p","b_p", "n_p")
            .label(0, getText("both_p").print() )
            .label(1, getText("a_p").print() )
            .label(2, getText("b_p").print() )
            .label(3, getText("n_p").print() )
            .labelsPosition("right")
            .vertical()
            .radio()
            .default(row.label)
            .disable()
            .print()
            .log("last")
        ,
        newText("sp2", "<br>")
            .print()
        ,
        newButton("Proceed")
            .print()
            .wait(getScale("Scale").test.selected())

        )
    )

newTrial("instruction_practice",
    newHtml("pre_practice.html")
        .print()
    ,
    newButton("Proceed to the practice session")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);


// Practice
Template(
    GetTable("intro_trials.csv")
        .filter("block", "practice")
    , row =>
    newTrial("practice" ,
        newText("sentence_1", row.s1)
            .print()
        ,
        newText("sentence_2", row.s2)
            .print()
        ,
        newText("sp1","<br>")
            .print()
        ,
        newText("both_p","Both are equally natural.")
        ,
        newText("a_p","A is more natural.")
        ,
        newText("b_p","B is more natural.")
        ,
        newText("n_p","Neither is natural.")
        ,

        newText("Which one is more natural?<br><br>")
            .print()
        ,
        newScale("Scale", "both_p","a_p","b_p", "n_p")
            .label(0, getText("both_p").print() )
            .label(1, getText("a_p").print() )
            .label(2, getText("b_p").print() )
            .label(3, getText("n_p").print() )
            .labelsPosition("right")
            .vertical()
            .radio()
            .print()
            .log("last")
        ,
        newText("sp2", "<br>")
            .print()
        ,
        newButton("See the answer")
            .print()
            .wait( getScale("Scale").test.selected() )
        ,
        getText("sp2")
            .remove()
        ,
        getButton("See the answer")
            .remove()
        ,
        getText(row.answer)
            .color("red")
        ,
        getScale("Scale")
            .disable()
        ,
        getScale("Scale")
            .test.selected(row.answer)
            .success(newText("correct","<br><strong>Good Job!</strong><br><br>").print())
            .failure(newText("wrong", "<br><strong>Your answer was not correct. Please be careful!</strong><br><br>").print())
        ,
        newButton("Proceed")
            .print()
            .wait()

        )
    )



newTrial("instruction_exit",
    newHtml("instruction_exit.html")
        .print()
    ,
    newButton("Proceed to the experiment")
        .print()
        .wait()
    ).setOption("hideProgressBar", true);


    Template(
        GetTable("jud_list1.csv")
        , row =>
        newTrial("experiment" ,
            newText("sentence_1", row.s1)
                .print()
            ,
            newText("sentence_2", row.s2)
                .print()
            ,
            newText("sp1","<br>")
                .print()
            ,
            newText("both_p","Both are equally natural.")
            ,
            newText("a_p","A is more natural.")
            ,
            newText("b_p","B is more natural.")
            ,
            newText("n_p","Neither is natural.")
            ,

            newText("Which one is more natural?<br><br>")
                .print()
            ,
            newScale("Scale", "both_p","a_p","b_p", "n_p")
                .label(0, getText("both_p").print() )
                .label(1, getText("a_p").print() )
                .label(2, getText("b_p").print() )
                .label(3, getText("n_p").print() )
                .labelsPosition("right")
                .vertical()
                .radio()
                .print()
                .log("last")
            ,
            newText("sp2", "<br>")
                .print()
            ,
            newButton("Proceed")
                .print()
                .wait(getScale("Scale").test.selected())

            )
            .log("subject_id", subject_id)
            .log("context_id", row.context_id)
            .log("pair_id", row.pair_id)
            .log("verb", row.verb)
            .log("list_id", row.list_id)
        )


newTrial("exit_form",
    newFunction( ()=>$("body").removeClass('standout') ).call(),
    newHtml("exit", "exit_readonly.html")
        .print()
        .log("worker_id","identifier"),
    newButton("Upload the data and see the experiment code")
        .print()
        .wait(getHtml("exit").test.complete()
            .failure( getHtml("exit").warn() ))
          )
          .log("subject_id", subject_id)
          .setOption("hideProgressBar", true);

newTrial("exit",
    newHtml("exit2","exit2.html")
        .print()
    ,
    newTimer("timer_exit",1)
        .wait()
).setOption("hideProgressBar", true);
