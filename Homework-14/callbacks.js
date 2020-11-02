const num = Math.floor(Math.random() * 1000);
let startTime, endTime;


function getElapsedTime(num, callback1, callback2, callback3) {
    let startTime = new Date();
    callback1 && callback1(num);
    callback2 && callback2(num);
    callback3 && callback3(num);
    let endTime = new Date();
    let elapsedTime = endTime - startTime;
    console.log(`The elapsed time is: ${elapsedTime}`);
}


function squareNum(num) {
    console.log(`Sqare of ${num} is ` + num*num);
}


function squareRootNum(num) {
    setTimeout(() => {
        console.log(`The square root of ${num} is `  + Math.sqrt(num));
    }, num);
    
}

    

function getPrime(num){
    for (let i=num-1;i>0;i--){
       if (isPrime(i) === true){
           console.log(`The closest prime number lowest than ${num} is: ` + i);
           break;
       }
    }
}


function isPrime(value){
    if (value < 2) return false;
    let q = Math.floor(Math.sqrt(value));
    for (let i=2;i<q;i++){
        if ( value%i===0 ){
            return false;
        }
    }
    return true;
}


getElapsedTime(num, squareNum, squareRootNum, getPrime);
