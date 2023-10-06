const topicOptions = [
  {
    text: 'Programming',
    value: 'programming',
  },
  {
    text: 'Database',
    value: 'database',
  },
  {
    text: 'Devops',
    value: 'devops',
  },
]
const tableColumns = [
  {
    name: 'name',
    width: '38%',
  },
  {
    name: 'author',
    width: '25%',
  },
  {
    name: 'topic',
    width: '20%',
  },
  {
    name: 'action',
    width: '17%',
  },
]
const defaultBooks = [
  {
    name: 'Refactoring',
    author: 'Martin Fowler',
    topic: 'programming',
    rowId: 0,
  },
  {
    name: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    topic: 'database',
    rowId: 1,
  },
  {
    name: 'The Phoenix Project',
    author: 'Gene Kim',
    topic: 'devops',
    rowId: 2,
  },
]

export { topicOptions, tableColumns, defaultBooks }
