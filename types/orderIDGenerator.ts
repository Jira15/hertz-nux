export class OrderIDGenerator {
  private prefix: string;
  private maxLength: number;
  private usedIDs: Set<string>;

  constructor(prefix: string, maxLength: number) {
    this.prefix = prefix;
    this.maxLength = maxLength;
    this.usedIDs = new Set();
  }

  private getRandomCharacter(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  public generateUniqueID(): string {
    let id: string;
    do {
      id = this.prefix;
      for (let i = 0; i < this.maxLength; i++) {
        id += this.getRandomCharacter();
      }
    } while (this.usedIDs.has(id));
    this.usedIDs.add(id);
    return id;
  }
}

export const generator = new OrderIDGenerator("HZ-", 5);

export function getUniqueOrderID(): string {
  return generator.generateUniqueID();
}