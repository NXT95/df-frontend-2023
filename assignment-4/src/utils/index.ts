import { topicOptions } from '../constant'

export function getTextOfTopic(value: string) {
  return topicOptions.find((option) => option.value === value)?.text
}
