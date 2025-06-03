class Account {
  constructor(balance = 0, name, ssn) {
    this.balance = balance;
    this.name = name;
    this.ssn = ssn.replace(/-/g, ""); // 숫자만 남김
    this.createdAt = Date.now();
    this.locked = false;

    // 고유 우선순위 키 (정렬 기준)
    this.priorityKey = BigInt(`${this.createdAt}${this.ssn}`);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    console.log(`${this.name}: 잔액 부족`);
    return false;
  }

  deposit(amount) {
    this.balance += amount;
  }

  getBalance() {
    console.log(`${this.name} (${this.ssn})'s balance = ${this.balance}`);
  }

  async acquireLock() {
    while (this.locked) {
      await new Promise((res) => setTimeout(res, 10));
    }
    this.locked = true;
  }

  releaseLock() {
    this.locked = false;
  }

  async transferTo(to, amount) {
    const [first, second] = [this, to].sort((a, b) => {
      return a.priorityKey < b.priorityKey ? -1 : 1;
    });

    await first.acquireLock();
    await second.acquireLock();

    const success = this.withdraw(amount);
    if (success) {
      to.deposit(amount);
      console.log(`${this.name} → ${to.name}: ${amount} 송금 완료`);
    } else {
      console.log(`${this.name}: 송금 실패`);
    }

    first.releaseLock();
    second.releaseLock();
  }
}
