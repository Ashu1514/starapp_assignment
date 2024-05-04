// Brute force approach  // O(n^2)
/*
const findShortestPart = (airports) => {
  let airport = 0; // at the first airport
  let planes = 1; // start with one plane

  const destination = airports.length - 1; // destination to reach

  while (airport <= destination) {
    let fuel = airports[airport]; // fuel at the current airport 
    let furthest = airport + fuel; // airport we can reach with this plane

    if (furthest >= destination) {
      // if plane can take beyoud destination
      return planes;
    }

    let nextAirport = airport; // next airport to take plan
    for (let i = airport + 1; i <= furthest; i++) {
        //if fuel + next airport index > airport index + its fuel
      if (i + airports[i] > nextAirport + airports[nextAirport]) {
        nextAirport = i; // finding next airport to switch plan
      }
    }

    if (nextAirport == airport) {
      // if no airport found
      return -1;
    }

    airport = nextAirport; // witch plane
    planes++; // count plane
  }

  return -1; // not reached to destination
};
*/


// optimal approach // O(n)
function findShortestPart(airports) { 
  let planes = 0; 
  let airport = 0; // starting airport
  let max = 0; // max reacheable airport
  let r = 0; // scanner

  while (r < airports.length) {
    // check how max we can go and save it
    max = Math.max(max, r + airports[r]);

    // airport and scanner at same point
    if (r == airport) {
      if (r == max) {
        // if scanner at its max reach then we have to return -1
        return -1;
      }
      planes++; // switching plane
      airport = max; // to land on max reached airport
      if (airport >= airports.length - 1) {
        // if plane has landed on destination
        return planes;
      }
    }
    r++;
  }

  return -1; // if we never reach
}

// const data = [2, 1, 2, 3, 1];
// const data = [2, 1, 2, 3, 1, 0, 0, 0, 0, 0, 1];
const data = [1, 6, 3, 4, 5, 0, 0, 0, 6];

console.log(findShortestPart(data));






