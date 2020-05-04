type Asset = {
  name: string,
  src: string
}

export class Config {
  public static images: Array<Asset> = [
    {
      name: "bomb",
      src: "images/bomb.png"
    }
  ]
}