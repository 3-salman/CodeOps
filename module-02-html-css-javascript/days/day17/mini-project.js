



function createLoyalty(earnRule = (etb) => Math.floor(etb / 10)) {
  let points = 0;

  return {
    earn(etb) {
      points += earnRule(etb);
    },
    redeem(p) {
      points = Math.max(0, points - p);
    },
    balance() {
      return points;
    }
  };
}

const standardCard = createLoyalty();
standardCard.earn(250);
console.log("Standard Card Balance:", standardCard.balance());

standardCard.redeem(10);
console.log("After Redeem 10:", standardCard.balance());

standardCard.redeem(50);
console.log("After Redeem 50 (capped at 0):", standardCard.balance());

const doublePointsRule = (etb) => Math.floor(etb / 10) * 2;
const holidayCard = createLoyalty(doublePointsRule);

holidayCard.earn(250);
console.log("Holiday Card Balance (Double Points):", holidayCard.balance());

console.log("Standard Card unchanged:", standardCard.balance());