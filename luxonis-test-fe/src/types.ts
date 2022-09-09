export type Entity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Property = Entity & {
  name: string;
  images: Image[];
}

export type Image = Entity & {
  url: string;
  propertyId: string;
}