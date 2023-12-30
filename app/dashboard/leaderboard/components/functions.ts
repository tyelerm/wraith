import crypto from "crypto";

export const randomUsers = (count: number) => {
    const randomAddress = () => "0x" + crypto.randomBytes(16).toString("hex");
    const randomPoints = () => ~~(Math.random() * 999999999);
    const randomBoost = () => (Math.random() * 3 + 1).toFixed(2);

    let users = [] as any;

    while (users.length < count) {
        users.push({
            address: randomAddress(),
            wraith_points: randomPoints(),
            active_boost: randomBoost() + "x",
        });
    }

    return users;
};
