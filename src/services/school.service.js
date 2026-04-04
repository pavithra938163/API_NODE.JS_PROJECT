const { createSchool, getAllSchools, softDeleteSchool } = require('../models/school.model');
const { calculateDistanceKm } = require('../Utils/distance');
const ApiError = require('../Utils/apiError');

async function addSchool(payload, userId) {
  return createSchool({
    ...payload,
    createdBy: userId
  });
}

async function listSchools({ latitude, longitude, page, limit, search }) {
  const schools = await getAllSchools({ search });

  const schoolsWithDistance = schools
    .map((school) => ({
      ...school,
      distanceKm: Number(
        calculateDistanceKm(
          latitude,
          longitude,
          Number(school.latitude),
          Number(school.longitude)
        ).toFixed(2)
      )
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const startIndex = (page - 1) * limit;
  const paginatedSchools = schoolsWithDistance.slice(startIndex, startIndex + limit);

  return {
    page,
    limit,
    total: schoolsWithDistance.length,
    totalPages: Math.ceil(schoolsWithDistance.length / limit),
    data: paginatedSchools
  };
}

async function deleteSchool(id) {
  const deleted = await softDeleteSchool(id);

  if (!deleted) {
    throw new ApiError(404, 'School not found or already deleted');
  }

  return { message: 'School deleted successfully' };
}

module.exports = {
  addSchool,
  listSchools,
  deleteSchool
};
