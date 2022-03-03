PennController.ResetPrefix()

Template(
    GetTable("jud_list1.csv")
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
        ,
        newText("sp2", "<br>")
            .print()
        ,
        newButton("Proceed")
            .print()
            .wait( getScale("Scale").test.selected() )

        )
    )
