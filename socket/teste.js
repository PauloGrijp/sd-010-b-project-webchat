// function fahrenheit_to_celsius(temp_fahrenheit) {
//     const conversion = (temp_fahrenheit - 32) * 5 / 9;
//     return Math.round(conversion).toFixed(1);
// };

// console.log(fahrenheit_to_celsius(95));

// function difference(x) {
//   const diference = x - 10;
//   return Math.abs(diference);
// };

// console.log(difference(5));

// function count_down(x) {
//   let count = x;
//   let string = '';
//   while (count > 0) {
//     string += `${count}...`;
//     count-=1;
//   }
//   string += '0!!!';
//   return string;
// }

// console.log(count_down(10));

// function multiples_of_3_or_5(roof) {
//   let sum = 0;
//   for (let i = 0; i < roof; i++) {
//     if (i % 3 === 0 || i % 5 === 0) {
//       sum += i;
//     }
//   }
//   return sum;
// };

// console.log(multiples_of_3_or_5(10));

// function even_fibonacci_numbers(roof) {
//   let sum = 0;
//   let a = 1;
//   let b = 2;
//   while (b < roof) {
//     if (b % 2 === 0) {
//       sum += b;
//     }
//     let temp = a;
//     a = b;
//     b = temp + b;
//   }
//   return sum;
// }

// console.log(even_fibonacci_numbers(100));

// function is_prime(n) {
//   if (n === 1) {
//     return false;
//   }
//   if (n === 2) {
//     return true;
//   }
//   for (let i = 2; i < n; i += 1) {
//     if (n % i === 0) {
//       return false;
//     }
//   }
//   return true;
}

// function nth_prime(n) {
//   let prime = 2;
//   let count = 1;
//   while (count < n) {
//     prime += 1;
//     if (is_prime(prime)) {
//       count += 1;
//     }
//   }
//   return prime;
// }

// console.log(nth_prime(6));

// function largest_prime_factor(number) {
//   let prime = 2;
//   while (number > 1) {
//     if (number % prime === 0) {
//       number = number / prime;
//     } else {
//       prime += 1;
//     }
//   }
//   return prime;
// }

console.log(largest_prime_factor(13195));

// function remove_zero(values) {
//   const valid = [];
//   while (values[0] === 0) values.splice(0, 1);
//   values.forEach((value, index) => {
//     if (values[index + 1] === 0) {
//       values.splice(index, 1);
//     } else {
//       valid.push(value);
//     }
// });
//   return valid;
// }

// function array_sum(values) {
//   let sum = 0;
//   values.forEach((value) => {
//     sum += value;
//   });
//   return sum;
// }

// function caixa(values) {
//   let valid = remove_zero(values);
//   while (valid.includes(0)) {
//     valid = remove_zero(valid);
//   }
//   return array_sum(valid);
// }

// console.log(caixa([0, 1, 3, 5, 4, 0, 0, 7, 0, 0, 6, 5]));

// function is_multiple(number, multiple) {
//   return number % multiple === 0;
// }

// function smallest_multiple(roof) {
//   let multiple = roof;
//   while (true) {
//     let is_multiple = true;
//     for (let i = 1; i < roof; i += 1) {
//       if (multiple % i !== 0) {
//         is_multiple = false;
//         break;
//       }
//     }
//     if (is_multiple) {
//       return multiple;
//     }
//     multiple += roof;
//   }
// };

// console.log(smallest_multiple(10));

// function digits_soma(number) {
//   let sum = 0;
//   while (number > 0) {
//     sum += number % 10;
//     number = Math.floor(number / 10);
//   }
//   return sum;
// }

// function digits_sum(number_s) {
//   let valid = [];
//   let limit = 1000;
//   let sum = 0;
//   while (sum < limit) {
//     if (digits_soma(sum) === number_s) valid.push(sum);
//     sum += 1;
//   }
//   return valid.length;
// }

// console.log(digits_sum(26));

// function is_palindrome(number) {
//   let number_s = number.toString();
//   let reverse = '';
//   for (let i = number_s.length - 1; i >= 0; i -= 1) {
//     reverse += number_s[i];
//   }
//   return number_s === reverse;
// };

// function largest_palindrome_product(digits) {
//   let max = 0;
//   let max_number = 0;
//   for (let i = 0; i < 10 ** digits; i += 1) {
//     for (let j = 0; j < 10 ** digits; j += 1) {
//       const number = i * j;
//       if (number > max && is_palindrome(number)) {
//         max = number;
//         max_number = i * j;
//       }
//     }
//   }
//   return max_number;
// }

// console.log(largest_palindrome_product(2));

// function poligrama(word) {
//   let poligrama = '';
//   for (let i = 0; i < word.length; i += 1) {
//     poligrama += word[i];
//     poligrama += word[word.length - i - 1];
//   }
//   return poligrama;
// }

// console.log(poligrama('bbabab'));

// function square_digit(number) {
//   let sum = 0;
//   let number_s = number.toString();
//   for (let i = 0; i < number_s.length; i += 1) {
//     sum += Math.pow(number_s[i], 2);
//   }
//   return sum;
// }

// function square_digit_chain(number) {
//   let count = 0;
//   let next = number;
//   while (next !== 89 && next !== 1) {
//     next = square_digit(next);
//     count += 1;
//   }
//   return count;
// }

// function square_digit_chains(n) {
//   let chain = n;
//   let count = 0;
//   while (chain !== 89 && chain !== 1) {
//     chain = square_digit_chain(chain);
//     count += 1;
//   }
//   return count;
// }

// console.log(square_digit_chains(100));