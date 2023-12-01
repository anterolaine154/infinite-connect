/*
  Filename: ComplexCode.js
  Description: This code demonstrates a sophisticated algorithm for prime number generation and manipulation.
  Author: Your Name
  Date: [Insert Date]
*/

// Generate a list of prime numbers up to a certain limit
function generatePrimeNumbers(limit) {
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(num);
    }
  }
  return primes;
}

// Check if a number is prime
function isPrime(number) {
  if (number <= 1) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

// Find the sum of all prime numbers in the given array
function sumOfPrimes(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    if (isPrime(numbers[i])) {
      sum += numbers[i];
    }
  }
  return sum;
}

// Find the product of all prime numbers in the given array
function productOfPrimes(numbers) {
  let product = 1;
  for (let i = 0; i < numbers.length; i++) {
    if (isPrime(numbers[i])) {
      product *= numbers[i];
    }
  }
  return product;
}

// Generate a list of prime numbers using sieve of Eratosthenes algorithm
function sieveOfEratosthenes(limit) {
  const primes = new Array(limit + 1).fill(true);
  primes[0] = primes[1] = false;

  for (let p = 2; p * p <= limit; p++) {
    if (primes[p] === true) {
      for (let i = p * p; i <= limit; i += p) {
        primes[i] = false;
      }
    }
  }

  return primes.reduce((primeNumbers, isPrime, idx) => {
    if (isPrime) primeNumbers.push(idx);
    return primeNumbers;
  }, []);
}

// Generate the first 1000 prime numbers using the sieve of Eratosthenes
const primeList = sieveOfEratosthenes(7919);

console.log("Prime Numbers: ", primeList);
console.log("Sum of Prime Numbers: ", sumOfPrimes(primeList));
console.log("Product of Prime Numbers: ", productOfPrimes(primeList));