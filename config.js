module.exports = {
  API_URL: JSON.stringify('http://localhost:3000/api/v1'),
  GOOGLE_API_KEY: JSON.stringify("GOOGLE_API_KEY"),
  AWS_KEY: JSON.stringify("AWS_KEY"),
  AWS_SECRET: JSON.stringify("AWS_SECRET"),
  DB_URL: JSON.stringify('mongodb://localhost:27017/cornerstone'),
  DOMAIN_URL: JSON.stringify("http://localhost:3000"),
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}
