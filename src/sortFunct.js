// sort By Name Title
export function compareTitle(a, b) {
    let compA;
    let compB;
    if (a.title) {
        compA = a.title.toUpperCase();
        compB = b.title.toUpperCase();
    } else {
        compA = a.name.toUpperCase();
        compB = b.name.toUpperCase();
    }
    
    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
  }

// Sort by popularity
 export function comparePopularity(a, b) {
    const compA = a.popularity;
    const compB = b.popularity;
    
    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
  }
// Sort by date New
export function compareDateNew(a, b) {
    const compA = new Date(a.release_date);
    const compB = new Date(b.release_date);
    
    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
  }

// Sort By Date OLd
export function compareDateOld(a, b) {
        const compA = new Date(a.release_date);
        const compB = new Date(b.release_date);
        
        let comparison = 0;
        if (compA < compB) {
          comparison = 1;
        } else if (compA > compB) {
          comparison = -1;
        }
        return comparison;
      }

