export interface IMenuItem {
  title: string
  link: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  linkFunction: Function
  children?: Array<IMenuItem>
}
