import { atom, DefaultValue } from "recoil";

const localStorageEffect = (key: string) => {
  // 함수 반환
  // effects 속성에 지정된 함수들은 setSelf , onSet 등 Recoil에서 제공하는 함수들을 인자로 받아 사용할 수 있다.
  return ({ setSelf, onSet }: any) => {
    // localStorage의 값 꺼냄
    const savedValue = localStorage.getItem(key);
    // 값이 있으면 atom의 값으로 지정
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    // onSet - 값이 변경될 때 실행 될 함수
    // 3개의 인자를 제공하는 콜백함수를 인자로 받는다.
    onSet((newValue: string, _: DefaultValue, isReset: boolean) => {
      // 값이 변경될 때 기존의 localStorage의 값을 지우고, 변경된 새로운 값을 localStorage에 저장
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
};

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
  // effects 속성 - useEffect Hook 처럼 처음 전역 변수가 지정될 때 atom을 추가로 관리할 수 있게 해준다.
  effects: [localStorageEffect("theme")],
});
