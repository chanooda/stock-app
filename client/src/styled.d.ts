// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    color: string;
    accentColor: string;
    downColor: string;
    box: string;
  }
}
