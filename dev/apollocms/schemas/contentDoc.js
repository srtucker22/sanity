export default {
  name: 'ContentDoc',
  type: 'document',
  title: 'ContentDoc',
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
      name: 'tags',
      title: 'tags',
      type: 'tags',
    },
    {
      name: 'content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
        {type: 'break'},
        {type: 'button'},
        {type: 'contentBlock'},
        {type: 'reference', to: [{type: 'ContentDoc'}]},
      ],
    },
  ],
}
