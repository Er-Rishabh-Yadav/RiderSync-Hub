import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect( process.env.MONGODB_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log(">>> MONGO DB is connected");
        });
        connection.on("error", (err: any) => {
            console.log(">>> MONGO DB connection error:", err);
            process.exit();
        });
    } catch (error) {
        console.log('>>> something went wrong');
        console.log(error);
    }
}
