import {
  IconAffiliate,
  IconCalculator,
  IconCalendar,
  IconDatabase,
  IconDeviceFloppy,
  IconForms,
  IconListCheck,
  IconMap2,
  IconPalette,
  IconRelationOneToOne,
  IconSquareRoot2,
  IconToggleLeft,
  TablerIcon
} from '@tabler/icons'

export enum NodeType {
  Object = 'OBJECT',
  Boolean = 'BOOLEAN',
  String = 'STRING',
  Number = 'NUMBER',
  Enum = 'ENUM',
  Date = 'DATE',
  Binary = 'BINARY',
  Array = 'ARRAY',
  Color = 'COLOR',
  Location = 'LOCATION',
  Formula = 'FORMULA',
  Reference = 'REFERENCE'
}

export const iconMap: Record<NodeType, TablerIcon> = {
  [NodeType.Array]: IconDatabase,
  [NodeType.Binary]: IconDeviceFloppy,
  [NodeType.Boolean]: IconToggleLeft,
  [NodeType.Date]: IconCalendar,
  [NodeType.String]: IconForms,
  [NodeType.Number]: IconCalculator,
  [NodeType.Enum]: IconListCheck,
  [NodeType.Object]: IconAffiliate,
  [NodeType.Color]: IconPalette,
  [NodeType.Location]: IconMap2,
  [NodeType.Formula]: IconSquareRoot2,
  [NodeType.Reference]: IconRelationOneToOne
}
