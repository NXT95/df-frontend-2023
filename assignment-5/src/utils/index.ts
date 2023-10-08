import { TOPIC_OPTIONS } from '../constant'

export function getTextOfTopic(value: string) {
  return TOPIC_OPTIONS.find((option) => option.value === value)?.text
}
