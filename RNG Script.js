/*
1. random number of clientele
2. Each client has a 65-99 chance to visit a gambling table
3. range of rounds they play at the table
    a. cap could be a total of 25GP lost
4. range of bets they place per round 
    a. range is 1-4GP
5. house has 65-70 chance to win 
6. kneebreaker takes percentage or flat fee 
7. result is the houses take 
*/


// Total number of clients who visited for the day
var clients = (function getClientele(min, max) {
    min = Math.ceil(20); //minimum number of clients that would show up
    max = Math.floor(41); //maximum number of clients that would show up
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
})();
    
// Percent of those clients who decided to gamble
var gamblePercent = (function percentClientsGambling (min, max) {
    min = Math.ceil(70); //min percentage of clients gambling
    max = Math.floor(101); // max percentage of clients gambling
    return Math.floor(Math.random() * (max - min)) + min; 
})();
    
// Total number clients who actually gambled, rounded up to an interger
var totalClientsGambling = Math.ceil(clients * (gamblePercent * .01));
var fee = Math.ceil(totalClientsGambling / 10); // calculate fee to the kneebreakers based on how many clients show up (1GP per 10 clients, minimum of 1GP, max of 10GP)

//for loop calculating win or loss per round, gold bet per round, per client. 
var winTotal = 0 //counting totals from the wins
var lossTotal = 0 //counting totals from the losses
// the loop
for (var i = 1; i <= totalClientsGambling; i++) { // i = standard for counter variable
    var clientsArray = [];
    clientsArray.push(i);
    console.log('Client ' + clientsArray);
    // 1-5 rounds gambled
    var rounds = (function roundsGambled(min, max) {
        min = Math.ceil(1); //minimum of one round gambled
        max = Math.floor(6); //maximum of five rounds gambled
        return Math.floor(Math.random() * (max - min)) + min; 
    })();
    //loop through the rounds, calculate bets and earnings/losses
    console.log('Total rounds played: ' + rounds);
    var j = 1;
    while (j <= rounds) { // j = standard for counter variable
        var roundArray = [];
        roundArray.push(j);
        console.log('Round ' + roundArray);
        j++;
        // 1-4 GP bet each round, how much was bet?
        var bets = (function goldBet(min, max) {
            min = Math.ceil(1); //minimum of one round gambled
            max = Math.floor(5); //maximum of five rounds gambled
            return Math.floor(Math.random() * (max - min)) + min; 
        })();
        console.log('GP bet this round: ' + bets);
        // win or lose the round and call how much gold was won or lost. 
        var winPercent = (function winRNG(min, max) {
            min = Math.ceil(1); 
            max = Math.floor(101);
            return Math.floor(Math.random() * (max - min)) + min; 
        })();
        var result = winRNG(winPercent);
        function winRNG(result) {
            if (result <= 70) {
                console.log('Roll: ' + result + ' - The house wins ' + bets + ' GP!');
                winTotal += bets; // add winnings to the winTotal number
            } 
            else if (result > 70 && result < 101) {
                console.log('Roll: ' + result + ' - The house loses ' + bets + ' GP...');
                lossTotal += bets; // add losses to the lossTotal number
            } 
            else {
                console.log('Something went wrong in calculating who won...');
            }
        };
    };   
};
// earnings report
console.log('Total clients for the day: ' + clients);
console.log('Percent of clients who gambled: ' + gamblePercent + '%');
console.log('Total number of clients who gambled:' + ' ' + totalClientsGambling);
console.log('GP wins: ' + winTotal + 'GP');
console.log('GP losses: ' + lossTotal + 'GP'); 
console.log('Fee to Kneebreakers = ' + fee + 'GP');
console.log('Net gambling earnings to The Keep: ' + (winTotal - lossTotal - fee) + 'GP');