const User = require("../models/user");

const listUsers = async() => {
    try {
        return await User.findAll({
           attributes: [ "email"]
          //  attributes: [ "name"]
        });
    } catch(error) {
        console.log(error);
        return [];
    }
}

//find single User
const findOneUser = async(id) => {
    try {
        const user = await User.findOne({
            attributes: [ "id", "email"],
            //attributes: [ "name"],
            where: {id}
        });
        return user;

    } catch(error) {
        console.log(error);
        return [];
    }
}

//edit User
const editUser = async(id, newEmail) => { 
//const editUser = async(id, name) => { 

        const user = await User.update(
            {email: newEmail},
            //{name},
            {where: {id}}
        );

        const noResult = (currentValue) => currentValue === 0;

        if(user.length === 1 && user.every(noResult)){
            throw new Error("No user edited!");
        }        
        console.log(`Edited: ${user} user ${newEmail}`);
        //console.log(`Edited: ${user} user ${name}`);

}

//delete User
const removeUser = async(id) => { 

        const user = await User.destroy({where: {id}});
        //console.log(user);

        if(user === 0){
            throw new Error("No user deleted!");
        }        
        console.log(`Removed: ${user} user`);
}

module.exports = {
    listUsers,
    findOneUser,
    editUser,
    removeUser
};