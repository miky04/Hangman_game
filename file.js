const parole = ['ALBERO', 'ZUZZURULLONE', 'TAUMATURGO', 'ADENOSINTRIFOSFATO', 'OMBRELLO', 'CAMINO', 'COMODINO', 'AZZURRO', 'MUSICA', 'CONTEMPORANEAMENTE', 'DISTANZA', 'MASCHERINA', 'CATTEDRA']
var errors = 0;
var used_letters = [];
var l_usate = "";
let word ;
var vocals = "AEIOU";
var mask_word = "";
var play = true;
var name_image;

function restart(){
    errors = 0;
    used_letters = [""];
    random_n = Math.floor(Math.random()* parole.length);
    mask_word="";
    l_usate = "";
    name_image = "images/starting_img.jpeg";
    play = true;
    word = parole[random_n];
    
    camuffing(word);
    document.getElementById("parola").value = mask_word;
    document.getElementById("usedLetters").value = "";
    document.getElementById("errori").value = "0";
    document.getElementById("game_state").value = "In gioco";
    document.getElementById("immagine").src = name_image;
}

function scamuffing(w){
    var l;
    var j;
    var k;
    var count = 0;
    var count_v = 0;
    var i = 0;
    mask_word="";
    for(l of w){
        for(j of used_letters){
            if (l == j){
                mask_word += l;
                count = 0;
                break;
            }else{
                if (count < used_letters.length -1){
                    count += 1;
                }else{
                    for(k of vocals){
                        if(l == k){
                            mask_word += "+";
                            count_v = 0;
                            break;
                        }else{
                            if(count_v < vocals.length -1){
                                count_v += 1;
                            }else{
                                mask_word+= "-";
                                count_v = 0;
                                break;
                            }
                        }   
                    }
                    count = 0;
                }
            }
        }
    }
}

function camuffing(w){
    var j;
    var k;
    var count = 0;
    for(j of w){
        for(k of vocals){
            if (j == k){
                mask_word += "+";
                count = 0;
                break;
            }else{
                if (count < vocals.length -1){
                    count += 1;
                }else{
                    mask_word += "-";
                    count = 0;
                }
            }
        }
    }
}


function select_l(letter){
    if(play === true){
        checking_letter(letter);
        scamuffing(word);
        document.getElementById("parola").value = mask_word;
        document.getElementById("errori").value = errors;
        document.getElementById("immagine").src = name_image;
    }
    win();
    lose();
    
}
function win(){
    if (mask_word == word){
        document.getElementById("game_state").value = "HAI VINTO!!!";
        play = false;
    }
}

function lose(){
    if(errors == 6){
        document.getElementById("game_state").value = "HAI PERSO:(";
        play = false;
    }
}


function checking_letter(l){
    var i;
    var c = 0;
    for (i of used_letters){
        if(l == i){
            c = 0;
            break;
        }else{
            if(c < used_letters.length -1){
                c+=1;
            }else{
                c = 0;
                used_letters.push(l);
                l_usate += l + "-";
                document.getElementById("usedLetters").value = l_usate;
                checking_errors(l);
            }
        }
    }
}

function checking_errors(l){
    var a;
    var count_e = 0;
    for(a of word){
        if(a == l){
            count_e = 0;
            break;
        }else if(count_e < word.length -1){
            count_e += 1;
        }else{
            errors += 1;
            name_image = "images/img"+ (errors)+".jpeg";
        }
    }
}
