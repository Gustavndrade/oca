import { CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto implements Partial<CreateOrganizationDto> {
  name?: string;
  email?: string;
  cnpj?: string;
  phone?: string;
  isActive?: boolean;
}
