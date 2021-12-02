import pool from "./database";

const promisedPool = pool.promise()

export default promisedPool