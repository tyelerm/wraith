import crypto from "crypto";

export const randomUsers = (count: number) => {
    const randomAddress = () => "0x" + crypto.randomBytes(16).toString("hex");
    const randomPoints = () => ~~(Math.random() * 999999999);

    let users = [] as any;

    while (users.length < count) {
        users.push({
            rank: users.length + 1,
            address: randomAddress(),
            wraith_points: randomPoints(),
            active_boost: "boost",
        });
    }

    return users;
};
