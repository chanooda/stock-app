import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { ThemeButtonContainer } from "../styles/util.style";

function ThemeButton() {
  const changeTheme = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const onClick = () => {
    changeTheme((prev) => !prev);
  };
  return (
    <ThemeButtonContainer onClick={onClick} isDark={isDark}>
      <div></div>
      <img src="https://cdn-icons-png.flaticon.com/16/2910/2910890.png" alt="dark Theme button" />
      <img src="https://cdn-icons-png.flaticon.com/16/2910/2910891.png" alt="dark Theme button" />
    </ThemeButtonContainer>
  );
}

export default ThemeButton;
