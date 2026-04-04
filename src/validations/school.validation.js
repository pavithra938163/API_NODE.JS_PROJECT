const { z } = require('zod');

const addSchoolSchema = z.object({
  name: z.string().min(2, 'School name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180)
});

const listSchoolsQuerySchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional()
});

module.exports = {
  addSchoolSchema,
  listSchoolsQuerySchema
};
