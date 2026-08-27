
'use strict';






// PART 1: Function Basics ---
const sumDistances = (...distances) => {
    let total = 0;
  
   for (const dis of distances) {
          total += dis;
      }
  
  return total;
};
const totalDistance = sumDistances(2, 3);
console.log("1. Total Distance:", totalDistance + " km");








// 2. Arrow function with a default parameter for ratePerKm
const calculateBaseFare = (totalDistance, ratePerKm = 15) => {
    return totalDistance * ratePerKm;
};

const baseFare = calculateBaseFare(totalDistance);
console.log("2. Base Fare:", baseFare + " ETB");


// 3. Arrow function to format an amount to 2 decimal places with ETB
const formatCurrency = (amount) => {
    return `${amount.toFixed(2)} ETB`;
};

const formattedAmount = formatCurrency(baseFare);
console.log("3. Formatted Amount:", formattedAmount);









// --- PART 2: Higher-Order Functions ---

// Factory function returning a custom surge multiplier function
function makeSurgeMultiplier(surgeRate) {
    return (baseFare) => baseFare * surgeRate;
}

const standardPricing = makeSurgeMultiplier(1.0);
const rushHourPricing = makeSurgeMultiplier(1.5);

console.log("4. Standard Price:", standardPricing(baseFare) + " ETB");
console.log("5. Rush Hour Price:", rushHourPricing(baseFare) + " ETB");





// --- PART 3: Closures ---

// Function using closure to maintain private state for driver trips
function makeDriverTracker() {
    let tripsCompleted = 0;

    return {
        recordTrip() {
            tripsCompleted += 1;
        },

        getTrips() {
            return tripsCompleted;
        }
    };
}

const testTracker = makeDriverTracker();

console.log("6. Trips Before:", testTracker.getTrips());

testTracker.recordTrip();

console.log("7. Trips After:", testTracker.getTrips());


// --- PART 4: Composition & Callbacks ---

function generateReceipt(distances, surgeFn, tracker, callback) {

    // 1. Record the trip
    tracker.recordTrip();
    console.log("8. Trip Recorded:", tracker.getTrips());

    // 2. Sum the distances using the rest parameter / spread syntax
    const totalDistance = sumDistances(...distances);
    console.log("9. Total Distance:", totalDistance + " km");

    // 3. Calculate base fare
    const baseFare = calculateBaseFare(totalDistance);
    console.log("10. Base Fare:", baseFare + " ETB");

    // 4. Apply surge pricing
    const finalFare = surgeFn(baseFare);
    console.log("11. Final Fare:", finalFare + " ETB");
    

    // 5. Format total fare to string with ETB
    const formattedFare = formatCurrency(finalFare);
    console.log("12. Formatted Fare:", formattedFare);


    // 6. Create message string using template literals
    const message = `Trip #${tracker.getTrips()}: Total Fare is ${formattedFare}.`;
    console.log("13. Receipt:", message);


    // 7. Invoke the callback with the finished message
    callback(message);
}


































// --- TESTING YOUR CODE ---

const tayesTracker = makeDriverTracker();

const printToConsole = (message) => console.log("14. Callback Result:", message);


// Ride 1 - Standard pricing
console.log("\n--- RIDE 1 ---");

generateReceipt(
    [2, 3],
    standardPricing,
    tayesTracker,
    printToConsole
);


// Ride 2 - Rush Hour pricing
console.log("\n--- RIDE 2 ---");

generateReceipt(
    [10],
    rushHourPricing,
    tayesTracker,
    printToConsole
);

