export interface ICreateRouteDTO {
  userId: string,
  originName: string,
  destinationName: string,
  distance: number,
  duration: number,
  origin: number[],
  destination: number[],
  originNeighborhood: string,
  originNeighborhoodSlug: string,
}