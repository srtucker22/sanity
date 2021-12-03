export default {
  name: 'Collection',
  type: 'document',
  title: 'Collection',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
    },
    {
      name: 'context',
      title: 'context',
      type: 'tags',
    },
    {
      name: 'docs',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'ContentDoc'}]}],
    },
  ],
}
