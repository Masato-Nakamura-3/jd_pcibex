PennController.ResetPrefix()

Template(
    GetTable("resp_list_mwy_latest.csv")
    , row =>
    newTrial("mcq_t" ,
        newText("sentence_1", row.sentence1)
            .print()
        ,
        newText("sentence_2", row.sentence2)
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
        ,
        newText("sp2", "<br>")
            .print()
        ,
        newButton("Proceed")
            .print()
            .wait( getScale("Scale").test.selected() )

        )
    )
