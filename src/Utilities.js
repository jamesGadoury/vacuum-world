class UniqueKeyGenerator {
  
  constructor() {
    this.uniqueKey = 0
  }

  key() {
    return ++this.uniqueKey;
  }

}

export {UniqueKeyGenerator};
