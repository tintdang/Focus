var bcrypt = require("bcrypt-nodejs");

// User Model
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                //Checks if its an email
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //This will check if hashed password entered by user can be compared to the hashed password stored in the database
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // This runs before the user is created, This is hashing our password before it's entered into the database
    User.hook("beforeCreate", function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    return User;
};