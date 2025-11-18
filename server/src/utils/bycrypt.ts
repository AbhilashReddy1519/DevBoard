import bcrypt from "bcryptjs";

async function encryptPassword(userPassword: string) {
	try {
		return await bcrypt.hash(userPassword, 8);
	} catch (error) {
		console.error("Bcrypt hashing failed: ", error);
		throw new Error("Password encryption failed due to system error.");
	}
}

async function verifyPassword(
	userPassword: string,
	encryptedPassword: string,
) {
	try {
		return await bcrypt.compare(userPassword, encryptedPassword);
	} catch (error) {
		console.error("Bcrypt compare failed: ", error);
		throw new Error("Password verification failed due to system error.");
	}
}

export  { encryptPassword, verifyPassword };
