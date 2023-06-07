import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [req.params.id]
    );
    if (rows.length <= 0) return res.status(404).json("Employee Not Found");
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const createEmployees = async (req, res) => {
    const { name, salary } = req.body;
    try {
    const [rows] = await pool.query(
      "INSERT INTO employees (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const updateEmployees = async (req, res) => {
    const { id } = req.params;
    const { name, salary } = req.body;
    try {
    const [result] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE employee_id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee Not Found" });
    const [rows] = await pool.query(
      "SELECT * FROM employees WHERE employee_id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM employees WHERE employee_id = ?",
      [req.params.id]
    );
    if (result.affectedRows <= 0)
      res.status(404).json({ message: "Employee Not Found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};
