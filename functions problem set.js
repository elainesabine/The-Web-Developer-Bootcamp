// function isEven(x) {
//     even = false;
//     if (x % 2 == 0) {
//         even = true;
//     }
//     return even;
// }

function isEven(x) {
    return x % 2 === 0;
}

function factorial(x) {
    var counter = x;
    var result = 1;
    while (counter > 0) {
        result = result * counter;
        counter -= 1;
    }
    return result;
}

function kebabToSnake(string) {
    var result = "";
    for (i = 0; i < string.length; i++) {
        if (string[i] != "-") {
            result += string[i];
        }
        else {
            result += "_";
        }
    }
    return result
}

console.log(factorial(7))
console.log(isEven(6))
console.log(kebabToSnake("hello-world"))