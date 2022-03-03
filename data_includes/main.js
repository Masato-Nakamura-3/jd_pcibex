PennController.ResetPrefix()

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

Template(
    GetTable("short_list1.csv")
    , row =>
    newTrial("mcq_t" ,
        newText("sentence_1", row.s1)
            .print()
        ,
        newText("sentence_2", row.s2)
            .print()
        ,
        newText("sp1","<br>")
            .print()
        ,
        newText("both_p","Both are equally plausible")
        ,
        newText("a_p","A is more plausible")
        ,
        newText("b_p","B is more plausible")
        ,
        newText("n_p","Neither is plausible")
        ,

        newText("Which one is more plausible?<br><br>")
            .print()
        ,
        newScale("Scale", getText("both_p"),getText("a_p"),
        getText("b_p"),getText("n_p"))
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
            .wait( getScale("Scale").test.selected() )

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
