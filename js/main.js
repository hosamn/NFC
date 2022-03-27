const frameList = document.getElementsByClassName("presFrame");


function myStart() {    
    if (window.location.hash == '') {
        gotoSlide('wel_pg');
    } else {
        gotoSlide(window.location.hash.replace('#', '') + '_pg');
    }
}
// ^^ will need to execute this function again when user uese history!
// READ: https://stackoverflow.com/questions/829046/how-do-i-detect-if-a-user-has-got-to-a-page-using-the-back-button?rq=1

// will need to study this : js const vs let vs var


// if (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
//     alert('Got here using the browser "Back" or "Forward" button.');
// }



function removeHash() {
    var loc = window.location;
    if ("pushState" in history) {
        history.pushState("", document.title, loc.pathname + loc.search);
    } else {
        loc.hash = "";
    }
}



function gotoSlide(i) { // i as 'had_pg'

    for (let i = 0; i < frameList.length; i++) {
        frameList[i].style.display = "none";
    }

    document.getElementById(i).style.display = "block";

    // set the page url to the correct url with hash:
    if (i != 'wel_pg') {
        window.location = '#' + i.split('_')[0];
    } else {
        removeHash();
    }
}


function adddate() {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    document.getElementById("currentDate").innerText = date;
    // alert(document.getElementById("currentDate").innerText);
}


function nextslide(dir) {
    // document.querySelectorAll('iframe:not([style*="display:none"]), iframe:not([style*="display: none"])').length

    // var currentLoc = window.location.toString().split('#')[1];
    var currentLoc = window.location.hash.replace('#', '');           // .hash as '#had'
    var lastElemnt = frameList[frameList.length-1].id.split('_')[0]
    // alert(currentLoc);

    if (currentLoc == '' && dir == '>>') {
        gotoSlide(frameList[1].id)
    }

    else if (currentLoc == '' && dir == '<<') {
        gotoSlide(frameList[frameList.length-1].id)
    }

    else if (currentLoc == lastElemnt && dir == '>>') {
        gotoSlide(frameList[0].id)
    }

    else {

        for (let i = 0; i < frameList.length; i++) {

            var slideHash = frameList[i].id.split('_')[0]
    
            if (currentLoc == slideHash && dir == '>>') {
                gotoSlide(frameList[i + 1].id);
            }
    
            if (currentLoc == slideHash && dir == '<<') {
                gotoSlide(frameList[i - 1].id);
            }

        }
    }
}
