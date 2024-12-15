import { z } from 'zod';
import { UserSchema } from './user.type';

export const iUserCommitShema = z.object({
  content: z.string().nonempty({ message: 'Нужно заполнить' }),
  // files: z.array(
  //   z
  //     .instanceof(File)
  //     .refine(
  //       (file) =>
  //         ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'].includes(
  //           file.type
  //         ),
  //       { message: 'Invalid image file type' }
  //     )
  // ),
  files: z.any(),
});
export const commentShema = z.object({
  id: z.number(),
  content: z.string(),
  created_at: z.string(),
  editor_version: z.number(),
  files: z.array(z.any()),
  updated_at: z.string(),
  user: UserSchema,
});

export const listCommentsShema = z.array(commentShema);

export const stageShema = z.object({ id: z.number(), name: z.string() });

export const possibleTaskNextStagesShema = z.array(stageShema);

export type IUserCommit = z.infer<typeof iUserCommitShema>;
export type PossibleTaskNextStages = z.infer<typeof possibleTaskNextStagesShema>;
export type TypeStage = z.infer<typeof stageShema>;
export type TypeListCommentsShema = z.infer<typeof listCommentsShema>;
