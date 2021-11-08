import {
  IconAffiliate,
  IconCalculator,
  IconCalendar,
  IconDatabase,
  IconDeviceFloppy,
  IconForms,
  IconToggleLeft,
  TablerIcon
} from '@tabler/icons'

export enum NodeType {
  Object = 'OBJECT',
  Boolean = 'BOOLEAN',
  String = 'STRING',
  Number = 'NUMBER',
  Date = 'DATE',
  Binary = 'BINARY',
  Array = 'ARRAY'
}

export const iconMap: Record<NodeType, TablerIcon> = {
  [NodeType.Array]: IconDatabase,
  [NodeType.Binary]: IconDeviceFloppy,
  [NodeType.Boolean]: IconToggleLeft,
  [NodeType.Date]: IconCalendar,
  [NodeType.String]: IconForms,
  [NodeType.Number]: IconCalculator,
  [NodeType.Object]: IconAffiliate
}
