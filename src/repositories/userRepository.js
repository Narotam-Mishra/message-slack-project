import User from "../schema/user.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
    ...crudRepository(User),
    getByEmail: async function (email){
        const user = await User.findOne({ email });
        return user;
    },

    getByUsername: async function (username){
        // exclude password from user's detail
        const user = await User.findOne({ username }).select('-password');
        return user;
    }
}

export default userRepository;