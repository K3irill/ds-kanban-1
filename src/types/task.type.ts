import { z } from 'zod';

export const iUserCommitShema = z.object({
  content: z.string().nonempty({ message: 'Нужно заполнить' }),
  files: z.array(
    z
      .instanceof(File)
      .refine(
        (file) =>
          ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/gif'].includes(
            file.type
          ),
        { message: 'Invalid image file type' }
      )
  ),
  // files: z.any(),
});

export type IUserCommit = z.infer<typeof iUserCommitShema>;
