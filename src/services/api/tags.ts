export const getTagsApi = async ({ tasksListCol }) => {
  const tags = new Set();
  const tagsCol = await tasksListCol.get();
  await tagsCol.docs.forEach((doc) =>
    doc.get("tags")?.forEach((el) => tags.add(el))
  );

  return Array.from(tags);
};
