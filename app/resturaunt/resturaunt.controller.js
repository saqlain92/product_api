const restService = require("./resturaunt.service");
const catchAsync = require("../helpers/catchAsync");
const httpStatus = require("http-status");
const pick = require("../helpers/pick");
const sanitize = require("../helpers/sanitize");

const createRest = catchAsync(async (req, res, next) => {
  const result = await restService.createRest(req.user, req.body);
  res.status(httpStatus.CREATED).send(result);
});

const updateRest = catchAsync(async (req, res, next) => {
  const result = await restService.updateRest(req.user, req.params.resturauntId, req.body);
  res.status(httpStatus.CREATED).send(result);
});

const getbyid = catchAsync(async (req, res, next) => {
  const result = await restService.getRestById(req.params.resturauntId);
  res.status(httpStatus.CREATED).send(result);
});

const getResturaunts = catchAsync(async (req, res, next) => {
  let filter = pick(req.query, ["name", "owner", "city"]);
  let search = pick(req.query, ["searchKey", "searchValue"]);
  let options = pick(req.query, ["sortBy", "limit", "page"]);
  filter = sanitize(filter);
  search = sanitize(search);
  options = sanitize(options);
  console.log(filter);

  const result = await restService.filterRest(filter, options, search);
  res.status(httpStatus.OK).send(result);

});

const deleteRest = catchAsync(async (req, res, next) => {
  const result = await restService.delteRest(req.user,req.params.resturauntId);
  res.status(httpStatus.CREATED).send(result);
});




module.exports = {
  createRest,
  updateRest,
  getbyid,
  getResturaunts,
  deleteRest
}