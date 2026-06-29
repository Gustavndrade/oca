import { CreateUnitDto } from './create-unit.dto';

export class UpdateUnitDto implements Partial<CreateUnitDto> {
  capacity?: number;
  identifier?: string;
  notes?: string;
  description?: string;
  isActive?: boolean;
}
