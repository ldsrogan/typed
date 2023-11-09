class ID {
  id: number;
  constructor() {
    this.id = 0;
  }

  getId = () => {
    return this.id++; // whenever the item request the id, the id will be increated
  };
}

let itemId: ID;

// expose only the function that calls current id (singleton)
const nextId = () => {
  if (!itemId) {
    itemId = new ID();
  }
  return itemId.getId();
};

export default nextId;
