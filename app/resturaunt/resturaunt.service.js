const Resturaunt = require('./resturaunt.model');
const User = require('../user/user.model')
const { ErrorHandler } = require('../helpers/error');

const createRest = async (user, body) => {
    const rest = new Resturaunt({
        name: body.name,
        owner: user._id,
        description: body.description,
        city: body.city,
        address: body.address,
    })

    await rest.save();
    return { status: "200", success: "true", result: rest, message: "resturaunt created" }
}

const updateRest = async (user, id, updateBody) => {
    if (user && id && updateBody) {
        rest = await Resturaunt.findById(id);
        console.log(user._id, rest.owner)
        if (user._id == rest.owner) {
            _rest = await Resturaunt.findByIdAndUpdate(id, updateBody, { new: true })
            return { status: "200", success: "true", result: _rest, message: "resturaunt updated" }
        }
        return { status: "400", success: "false", result: {}, message: "invalid user" }
    }
}

const getRestById = async (id) => {

    if (id) {
        let rest = await Resturaunt.findById(id).populate("owner",);
        if (!!rest) return { status: "200", success: "true", result: rest, message: "resturaunt found" }
        else return { status: "200", success: "true", result: {}, message: "resturaunt not found" }
    }
    else return { status: "200", success: "true", result: rest, message: "resturaunt id is required" }
}

const filterRest = async (filter, options, search) => {
    Object.assign(options, { sortBy: "name" })
    if (search && search.searchKey && search.searchValue) {
        let filterSearch = {};
        filterSearch[search.searchKey] = new RegExp(search.searchValue, 'i');
        Object.assign(filter, filterSearch);
        console.log(filter);
        const rests = await Resturaunt.paginate(filter, options);
        return rests;
    }
    else {
        const rests = await Resturaunt.paginate(filter, options);
        return rests;
    }
}

const delteRest = async(user,id) => {
    const rest = await Resturaunt.findById(id);
    if(!rest) return {status: "200", success:"false", result:{}, message:"resturaunt not found"}
    if(user._id == rest.owner._id){
        _rest = await Resturaunt.findByIdAndDelete(id);
        return {status: "200", success:"true", result:_rest, message:"resturaunt deleted"}
    }
    else return {status: "400", success:"false", result:{}, message:"user is not allowed to delete this resturaunt"}
}

module.exports = {
    createRest,
    updateRest,
    getRestById,
    filterRest,
    delteRest

}