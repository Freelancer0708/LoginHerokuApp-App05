import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// 環境変数の読み込み
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE, // 修正
});

async function insertAdmin(username: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await pool.query(
      'INSERT INTO admins (email, password) VALUES (?, ?)', // テーブル名を小文字に修正
      [username, hashedPassword]
    );
    console.log('Admin user inserted successfully');
  } catch (error) {
    console.error('Error inserting admin user:', error);
  } finally {
    await pool.end();
  }
}

// 実行部分
const adminUsername = 'admin@mail.com'; // ここにadminのユーザー名を入力
const adminPassword = 'adminadmin'; // ここにadminのパスワードを入力

insertAdmin(adminUsername, adminPassword);
