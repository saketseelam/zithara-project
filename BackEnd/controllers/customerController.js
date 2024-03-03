import asyncHandler from "../middleware/asyncHandler.js";
import pool from "../connections/db.js";

//@desc     Populate db with dummy data
//@route    post /
//@access   Private (not exposed to public to add data using postman)
const populateDummyData = asyncHandler(async (req, res) => {
  try {
    const client = await pool.connect();
    for (let i = 0; i < 50; i++) {
      const randomDays = Math.floor(Math.random() * 11) - 5;
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() + randomDays);

      const query = `INSERT INTO customers (customer_name, age, phone, location, created_at) 
                       VALUES ($1, $2, $3, $4, $5)`;
      const values = [
        `Customer ${i + 1}`,
        20 + i,
        `12345678${i.toString().padStart(2, "0")}`,
        `Location ${i + 1}`,
        randomDate.toISOString(),
      ];
      await client.query(query, values);
    }
    res.status(200).json({ message: "Dummy data created successfully" });
    client.release();
  } catch (error) {
    console.error("Error creating dummy data", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@desc     Get all Customers pagination data accordingly
//@route    Get /
//@access   Public
const getAllCustomers = asyncHandler(async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = "sno", search = "" } = req.query;
    const offset = (page - 1) * pageSize;
    const client = await pool.connect();
    let query = `SELECT * FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1 ORDER BY ${sort} LIMIT $2 OFFSET $3`;
    const result = await client.query(query, [`%${search}%`, pageSize, offset]);
    const totalCountQuery = `SELECT COUNT(*) FROM customers WHERE customer_name ILIKE $1 OR location ILIKE $1`;
    const totalCountResult = await client.query(totalCountQuery, [
      `%${search}%`,
    ]);

    const totalRecords = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalRecords / pageSize);
    res.status(200).json({
      totalRecords,
      totalPages,
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      customers: result.rows,
    });
    client.release();
  } catch (error) {
    console.error("Error fetching records", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { getAllCustomers,populateDummyData };
