import { Book, TableColumn } from 'types'

const TOPIC_OPTIONS = [
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
const TABLE_COLUMNS: TableColumn[] = [
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
const DEFAULT_BOOKS: Book[] = [
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

const DEFAULT_PAGE_SIZE = 5

export { TOPIC_OPTIONS, TABLE_COLUMNS, DEFAULT_BOOKS, DEFAULT_PAGE_SIZE }
