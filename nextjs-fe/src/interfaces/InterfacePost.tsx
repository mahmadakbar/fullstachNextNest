export interface PostInterface {
  uuid: string
  title: string
  content?: string
  publish?: boolean
  image?: FileList | null | string
  createdAt: string
  updatedAt: string
}
