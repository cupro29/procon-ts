export default class Queue<T> {
	private left = 0;

	private d: T[] = [];

	public get length(): number {
		return this.d.length - this.left;
	}

	public get front(): T | undefined {
		return this.d.at(this.left);
	}

	public get back(): T | undefined {
		return this.d.at(-1);
	}

	public push(value: T): void {
		this.d.push(value);
	}

	public pop(): T | undefined {
		const res = this.d[this.left];
		this.left += 1;
		if (this.left >= this.d.length) {
			this.d = [];
			this.left = 0;
		}
		return res;
	}
}
