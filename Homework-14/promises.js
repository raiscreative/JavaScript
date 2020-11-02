let startTime, endTime;
const num = Math.floor(Math.random() * 2000);

const squareNum = (num) => {
    return new Promise((resolve, reject) => {
        if (num > 1000) {
            reject(`
    The script ran into an error.
    If it doesn't work as expected I don't blame you.`)
        } else {
            console.log(`The sqare of ${num} is ` + num*num);
            resolve();
        }
    });
};

const squareRootNum = (num) => {
    return new Promise((resolve, reject) => {
    setTimeout( () => {
        console.log(`The square root of ${num} is: ` + Math.sqrt(num));
        resolve();
    }, num);
    
    });
};

const closestPrime = (num) => {
    return new Promise((resolve, reject) => {
        getPrime(num);
        resolve();
    });
};

const elapsedTime = (startTime) => {
    let endTime = new Date();
    console.log(`The total elapsed time was: ` + (endTime - startTime) +  ` milliseconds.`)
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


const myPromise = (num) => {
    let startTime = new Date();

    squareNum(num) 
        .then( () => squareRootNum(num))
        .then( () => closestPrime(num))
        .then( () => elapsedTime(startTime))
        .catch( (err) => console.log(err));
};


myPromise(num);
    

