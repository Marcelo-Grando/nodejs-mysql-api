import { pool } from '../db.js'

export const getPing = async (req,res) => {
    const [result] = await pool.query('SHOW TABLES')
    res.json(result[0])
}  