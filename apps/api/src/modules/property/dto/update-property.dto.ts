import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto implements Partial<CreatePropertyDto> {
  name?: string;
  type?: import('@prisma/client').PropertyType;
  isActive?: boolean;
}
