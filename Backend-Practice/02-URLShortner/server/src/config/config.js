import dotenv from 'dotenv'

dotenv.config()

export const configEnv={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI
}