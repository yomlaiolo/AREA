import { ActionDto, ReactionDto } from 'src/area/dto/create-area.dto';
import { User } from 'src/users/user.schema';

interface ReactionInterface {
  method: string;
  service: string;
  description: string;
  example: object;

  data: object;

  user: User;

  exec(): Promise<void>; // Run the Reaction
  check(): Promise<boolean>; // Check if the reaction is valid
}

export { ReactionInterface };
