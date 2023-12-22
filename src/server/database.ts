import {
    MongoClient,
    MongoServerError,
    ServerApiVersion,
    UpdateFilter,
    UpdateOptions,
} from "mongodb";

export class Database {
    private client: MongoClient;

    constructor() {
        this.client = this.setClient();
    }

    setClient() {
        if (
            !(
                process.env.DATABASE_NAME ||
                process.env.DATABASE_USERNAME ||
                process.env.DATABASE_PASSWORD
            )
        ) {
            throw new Error(
                "one or more database environment variables are missing"
            );
        }
        return new MongoClient(
            `mongodb+srv://${process.env.DATABASE_USERNAME!}:${process.env
                .DATABASE_PASSWORD!}@dai-cluster.6t5wtfj.mongodb.net/${process
                .env.DATABASE_NAME!}?retryWrites=true&w=majority`,
            {
                serverApi: {
                    version: ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            }
        );
    }

    async createUser(
        externalUserId: string,
        email: string,
        isVerified: boolean,
        accountCreationDate: Date,
        isStaff: boolean
    ) {
        try {
            const usersCollection = this.client.db("dai").collection("users");
            const user = await usersCollection.insertOne({
                externalUserId: externalUserId,
                email: email,
                emailIsVerified: isVerified,
                accountCreationDate: accountCreationDate,
                lastUpdateDate: accountCreationDate,
                isStaff: isStaff,
                profile: {
                    avatar_url: null,
                    firstName: null,
                    lastName: null,
                    age: null,
                    lastUpdateDate: accountCreationDate,
                },
            });

            if (!user.insertedId) {
                throw new Error("user was not created");
            }
            return true;
        } catch (err: any) {
            const error = err as MongoServerError;
            if (error.code === 11000) {
                throw new Error("unique constraint violation");
            }
            throw error;
        }
    }

    async deleteUser(externalUserId: string) {
        try {
            const usersCollection = this.client.db("dai").collection("users");
            const deletedUser = await usersCollection.deleteOne({
                externalUserId: externalUserId,
            });
            if (deletedUser.deletedCount !== 1) {
                return false;
            }
            return true;
        } catch (err: any) {
            throw err;
        }
    }

    async updateUser(
        externalUserId: string,
        email: string,
        firstName: string,
        lastName: string,
        lastUpdateDate: Date
    ) {
        try {
            const usersCollection = this.client.db("dai").collection("users");
            const filter: UpdateFilter<{ externalUserId: string }> = {
                externalUserId: externalUserId,
            };
            const updateDocument = {
                $set: {
                    email: email,
                    profile: {
                        avatarUrl: null,
                        firstName: firstName,
                        lastName: lastName,
                        lastUpdateDate: lastUpdateDate,
                        age: null,
                    },
                },
            };
            const options: UpdateOptions = { upsert: false };
            const updatedUser = await usersCollection.updateOne(
                filter,
                updateDocument,
                options
            );
            if (
                updatedUser.matchedCount !== 1 ||
                updatedUser.modifiedCount !== 1
            ) {
                return false;
            }
            return true;
        } catch (err: any) {
            throw err;
        }
    }
}
