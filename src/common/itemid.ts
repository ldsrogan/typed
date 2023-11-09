class ID {
  id: number;
  constructor() {
    this.id = 0;
  }

  getId = () => {
    return this.id++;
  };
}

let itemId: ID;

const nextId = () => {
  if (!itemId) {
    itemId = new ID();
  }
  return itemId.getId();
};

export default nextId;
