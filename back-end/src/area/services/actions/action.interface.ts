import { ActionDto, ReactionDto } from 'src/area/dto/create-area.dto';
import { User } from 'src/users/user.schema';
import { CancellationToken } from 'src/utils/cancellation_token';

interface ActionInterface {
  method: string;
  service: string;
  description: string;
  example: object;

  actionDto: ActionDto;
  reactionDto: ReactionDto;
  user: User;

  token: CancellationToken;

  exec(): Promise<void>; // Run the loop of the action
  check(): Promise<boolean>; // Check if the action is valid
}

export { ActionInterface };
