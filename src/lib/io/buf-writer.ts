export type Writable = string | number | bigint;

export default class BufWriter {
	private buf = "";

	public write(value: Writable | Writable[], sep = " "): void {
		if (Array.isArray(value)) {
			this.buf = this.buf.concat(value.join(sep));
		} else {
			this.buf = this.buf.concat(value.toString());
		}
	}

	public writeln(value: Writable | Writable[], sep = " "): void {
		this.write(value, sep);
		this.write("\n");
	}

	public yn(flag: boolean): void {
		if (flag) {
			this.yes();
		} else {
			this.no();
		}
	}

	public yes(): void {
		this.write("Yes\n");
	}

	public no(): void {
		this.write("No\n");
	}

	public flush(): void {
		if (this.buf.length === 0) return;
		console.log(this.buf.trimEnd());
		this.buf = "";
	}
}
