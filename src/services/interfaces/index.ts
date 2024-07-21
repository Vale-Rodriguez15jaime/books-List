import { z } from 'zod'

export type BookItemType = z.infer<typeof bookItemSchema>

const baseResponseSchema = z
  .object({
    totalItems: z.number()
  })
  .passthrough()

const bookItemSchema = z
  .object({
    id: z.string(),
    volumeInfo: z.object({
      title: z.string(),
      subtitle: z.string().nullish(),
      authors: z.array(z.string()).nullish(),
      publisher: z.string().nullish(),
      publishedDate: z.string().nullish(),
      description: z.string().nullish(),
      pageCount: z.number().nullish(),
      categories: z.array(z.string()),
      imageLinks: z
        .object({
          smallThumbnail: z.string().nullish(),
          thumbnail: z.string().nullish()
        })
        .nullish(),
      canonicalVolumeLink: z.string().nullish()
    })
  })
  .passthrough()

export const getListBooksResponseSchema = baseResponseSchema
  .extend({
    items: z.array(bookItemSchema)
  })
  .passthrough()
