import { Pool } from "pg";

class PoolClass {
	_pool: any = null;

	connect(option: any) {
		this._pool = new Pool(option);
		return this._pool.query("SELECT 1+1 ;");
	}

	query(sql: any, values: any) {
		return this._pool.query(sql, values);
	}

	close() {
		return this._pool.end();
	}
}

const pool = new PoolClass();
export default pool;