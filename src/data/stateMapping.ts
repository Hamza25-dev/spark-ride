export interface StateMapping {
  [city: string]: string;
}

export const texasCities: StateMapping = {
  "houston": "Texas",
  "dallas": "Texas", 
  "austin": "Texas",
  "san antonio": "Texas",
  "el paso": "Texas",
  "fort worth": "Texas",
  "arlington": "Texas",
  "corpus christi": "Texas",
  "plano": "Texas",
  "lubbock": "Texas",
  // Add more Texas cities as needed
};

export const ohioCities: StateMapping = {
  "columbus": "Ohio",
  "cleveland": "Ohio",
  "cincinnati": "Ohio",
  "toledo": "Ohio",
  "akron": "Ohio",
  "dayton": "Ohio",
  "parma": "Ohio",
  "canton": "Ohio",
  "youngstown": "Ohio",
  "lorain": "Ohio",
  // Add more Ohio cities as needed
};

export const allCities: StateMapping = {
  ...texasCities,
  ...ohioCities
};