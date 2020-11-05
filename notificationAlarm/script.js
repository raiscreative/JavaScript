
let textBox ;
let timeInterval;
let arrForStorage = [];
let objForSore = {};
let status = true;

let divMain = document.getElementById("list");
let xx = document.createElement("UL");

xx.setAttribute("id","ul");
xx.setAttribute("class","collection");
divMain.appendChild(xx);

let myId  = 0;

createListFromStorage();

let btnApply = document.getElementById("btnApply");
btnApply.addEventListener("click",evokeNotification1);
timeInterval = setInterval(evokeNotification,1000);


function evokeNotification1() {
    clearInterval(timeInterval);
    timeInterval = setInterval(evokeNotification,1000);
    createListOfNotification();
}


function evokeNotification(){
    for (let ii=0;ii< xxxx.children.length;ii++){
        let jjj = document.getElementById(xxxx.children[ii].children[3].id);
        jjj.addEventListener("click",function () {
            jjj.parentNode.remove(jjj);
            arrForStorage.splice(ii,1);
            storeData(arrForStorage);
        });
    }

    if (arrForStorage === null){
        clearInterval(timeInterval);
        return;
    }
    if (arrForStorage.length === 0){
        clearInterval(timeInterval);
    }
    if (arrForStorage.length>0){
        let aaarr = [];
        for (let i=0;i<arrForStorage.length;i++){
            if (arrForStorage[i].status === true){
                aaarr.push(arrForStorage[i]);
            }
        }
        if (aaarr.length === 0){
            clearInterval(timeInterval);
        }
    }
    
    let nowTime = new Date().getTime();
    
    for (let i=0;i<arrForStorage.length;i++){
       let  inputTime = arrForStorage[i].time;
        if (nowTime >= inputTime){
            if (arrForStorage[i].status === true){
                setTimeout(myNotefication,1000);
                arrForStorage[i].status = false;
                storeData(arrForStorage);
                update(i);return;
            }
        }
    }
}


function getMessage (){
    let tt = document.getElementById("inputBox");
    textBox = tt.value;
    if (textBox === ""){
        textBox = "No Input Content";
    }
    return textBox;
}


function myNotefication(){
    Notification.requestPermission().then(function (result) {
        var notification = new Notification('🔔 Requested notification',{body:getMessage()});
        if (Notification.permission === "granted"){
        }
    }).catch(function (err) {
        alert("See "+ err);
    });
}


function srtringToTimeStemp(str,hr,min) {
    let tt = new Date(str);
    let dd = tt.getDate();
    let mm = tt.getMonth();
    let yy = tt.getFullYear();
    let hh = hr;
    let mints = min;
    let ss = tt.getSeconds();
    var d1 = new Date(yy, mm, dd, hh, mints, ss, 0);
    return d1.getTime();
}


var trig = ''
function createTemplate(el,str,message,stat) {
    myId++;
    if (stat === true) {
        trig = '⏰'
    } else {
        trig = '✔️'
    }
    let yy = document.createElement("LIST");
    yy.setAttribute("class","myList");
    el.appendChild(yy);
    yy.innerHTML = `
                        <span class="timeStamp collection1">${str}</span> 
                        <span class="message collection1">&nbsp  ${ message} </span>
                        <span class="status" id="bull${myId}" > &nbsp ${trig}</span>
                        <input type="button" class="collection1" value="❌" id="crossBtn${myId}"><br>
                        
                   `;
}


function createObj(aa,bb,cc){
    return {
        time: aa,
        msg: bb,
        status:cc,
    };
}


function storeData(data) {
    localStorage.set('myKey',data);
}


function retriveData(){
    var getArr = localStorage.getItem("myKey");
}


function clearData() {
    localStorage.clear();
}


function createListOfNotification() {
    let mes = getMessage();

    let ttstr = document.getElementById("inputDateBox").value;
    if (ttstr === ""){
        alert("please select date");
        clearInterval(timeInterval);
        return;
    }
    

    let ttstr1 = document.getElementById("inputHoursBox").value;
    if (ttstr1 === ""){
        alert("please select time and am/pm");
        clearInterval(timeInterval);
        return;
    }
    let temp =  ttstr1.split(":");


    let inputTime =  srtringToTimeStemp(ttstr,temp[0],temp[1]);

    let nowTime = new Date().getTime();
    if (nowTime > inputTime){
        alert("Timer Setting is wrong!!");
        status = false;

    }
    
    let newObj = createObj(inputTime,mes,status);
    if (arrForStorage === null){
        arrForStorage = [];
    }
    arrForStorage.push(newObj);
    storeData(arrForStorage);
    let combineStr = new Date(inputTime);
    createTemplate(xx,combineStr,mes,status);
}

function createListFromStorage(){
    arrForStorage = [];
    let storageLen = localStorage.length;
    if (storageLen === 0){
        return ;
    }
    let hh = localStorage.getItem("myKey");
    arrForStorage = JSON.parse(hh);
    if ( arrForStorage.length === 0){return;}
    for (let i=0;i<arrForStorage.length;i++){
        let convertMiliSecondsToTimeDate = new Date(arrForStorage[i].time);
        createTemplate(xx,convertMiliSecondsToTimeDate,arrForStorage[i].msg,arrForStorage[i].status);
    }

}


let xxxx = document.getElementById("ul");
for (let ii=0;ii< xxxx.children.length;ii++){
    let jjj = document.getElementById(xxxx.children[ii].children[3].id);
    jjj.addEventListener("click",function () {
        jjj.parentNode.remove(jjj);
        arrForStorage.splice(ii,1);
        storeData(arrForStorage);
    });
}


function update(i){
        let jjj1 = document.getElementById(xxxx.children[i].children[2].id);
        jjj1.innerText = false;
}


setInterval(updateTimeWatch,1000);
function updateTimeWatch(){
    let _nowT = document.getElementById("time");
    let temp = function () {
        return  new Date().getHours() + ":" + new Date().getMinutes() + ":"+new Date().getSeconds();
    };
    _nowT.innerText = tConvert(temp());
}


function tConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { 
        time = time.slice (1); 
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
        time[0] = +time[0] % 12 || 12; 
    }
    return time.join (''); 
}
