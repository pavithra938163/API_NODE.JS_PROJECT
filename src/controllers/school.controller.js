const { addSchoolSchema, listSchoolsQuerySchema } = require('../validations/school.validation');
const { addSchool, listSchools, deleteSchool } = require('../services/school.service');

async function createSchool(req, res) {
  const parsedBody = addSchoolSchema.parse({
    ...req.body,
    latitude: Number(req.body.latitude),
    longitude: Number(req.body.longitude)
  });

  const school = await addSchool(parsedBody, req.user?.id);

  return res.status(201).json({
    success: true,
    message: 'School added successfully',
    data: school
  });
}

async function getSchools(req, res) {
  const parsedQuery = listSchoolsQuerySchema.parse(req.query);
  const result = await listSchools(parsedQuery);

  return res.status(200).json({
    success: true,
    message: 'Schools fetched successfully',
    ...result
  });
}

async function removeSchool(req, res) {
  const result = await deleteSchool(Number(req.params.id));

  return res.status(200).json({
    success: true,
    ...result
  });
}

module.exports = {
  createSchool,
  getSchools,
  removeSchool
};
