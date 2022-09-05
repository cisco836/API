const Volumeat85 = (litres,Density,temperature)=>{
    if(Density==0){
        let a=0;
    }
    else if(Density>=0.64&&Density<0.644){
        let a =0.00083
    }
    else if(Density>=0.644&&Density<0.647){
        let a =0.00082
    }
    else if(Density>=0.648&&Density<0.652){
        let a =0.00081
    }
    else if(Density>=0.652&&Density<0.656){
        let a =0.0008
    }
    else if(Density>=0.656&&Density<0.66){
        let a =0.00079
    }
    else if(Density>=0.66&&Density<0.664){
        let a =0.00078
    }
    else if(Density>=0.664&&Density<0.668){
        let a =0.00077
    }
    else if(Density >= 0.66 && Density < 0.664){
        a = 0.00078
    }



    else if( Density >= 0.664 && Density < 0.668)
        a = 0.00077



    else if(Density >= 0.668 && Density < 0.672)
        a = 0.00076


    else if(Density >= 0.672 && Density < 0.676)
        a = 0.00075


    else if(Density >= 0.676 && Density < 0.681)
        a = 0.00074



    else if(Density >= 0.681 && Density < 0.686)
        a = 0.00073



    else if(Density >= 0.686 && Density < 0.691)
        a = 0.00072


    else if(Density >= 0.691 && Density < 0.696)
        a = 0.00071



    else if(Density >= 0.696 && Density < 0.701)
        a = 0.0007


    else if(Density >= 0.701 && Density < 0.706)
        a = 0.00069



    else if(Density >= 0.706 && Density < 0.711)
        a = 0.00068


    else if(Density >= 0.711 && Density < 0.716)
        a = 0.00067


    else if(Density >= 0.716 && Density < 0.721)
        a = 0.00066


    else if(Density >= 0.721 && Density < 0.726)
        a = 0.00065




    else if(Density >= 0.726 && Density < 0.731)
        a = 0.00064




    else if(Density >= 0.731 && Density < 0.736)
        a = 0.00063



    else if(Density >= 0.736 && Density < 0.741)
        a = 0.00062



    else if(Density >= 0.741 && Density < 0.746)
        a = 0.00061



    else if(Density >= 0.746 && Density < 0.751)
        a = 0.0006



    else if(Density >= 0.751 && Density < 0.757)
        a = 0.00059



    else if(Density >= 0.757 && Density < 0.762)
        a = 0.00058



    else if(Density >= 0.762 && Density < 0.768)
        a = 0.00057



    else if(Density >= 0.768 && Density < 0.773)
        a = 0.00056



    else if(Density >= 0.773 && Density < 0.778)
        a = 0.00055


    else if(Density >= 0.778 && Density < 0.784)
        a = 0.00054



    else if(Density >= 0.784 && Density < 0.79 )a = 0.00053


    else if(Density >= 0.79  &&Density < 0.796 )a = 0.00052



    else if(Density >= 0.796 && Density < 0.802)
        a = 0.00051



    else if(Density >= 0.802 && Density < 0.808)
        a = 0.0005



    else if(Density >= 0.808 && Density < 0.815)
        a = 0.00049



    else if(Density >= 0.815 && Density < 0.824)
        a = 0.00048


    else if(Density >= 0.824 && Density < 0.833)
        a = 0.00047



    else if(Density >= 0.833 && Density < 0.843)
        a = 0.00046



    else if(Density >= 0.843 && Density < 0.853)
        a = 0.00045


    else if(Density >= 0.853 && Density < 0.863)
        a = 0.00044



    else if(Density >= 0.863 && Density < 0.876)
        a = 0.00043



    else if(Density >= 0.876 && Density < 0.891)
        a = 0.00042



    else if(Density >= 0.891 && Density < 0.908)
        a = 0.00041



    else if(Density >= 0.908 && Density < 0.931)
        a = 0.0004




    else if(Density >= 0.931 && Density < 0.952)
        a = 0.00039


    else if(Density >= 0.952 && Density < 1) 
        0.00038


    let b = 85-temperature;
    let C = (b*a)+1;
    let D=litres*C;

    return D;
}


module.exports = Volumeat85;