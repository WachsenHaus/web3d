import { Canvas } from '@react-three/fiber';
import { Ground } from './Ground';
import { Physics, Debug } from '@react-three/cannon';
import { Stats, StatsGl } from '@react-three/drei';
import Car from './Car';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { isStartScene } from './utils/atom';
import DrawCall from './components/DrawCall';
// import fontjson from './Pretendard.json';

function Scene() {
  const isStart = useRecoilValue(isStartScene);
  // useEffect(() => {
  //   const fontData = fontjson;
  //   console.log(fontData);
  //   const targetText = 'How to Play↑←↓→';
  //   const modifiedGlyphs = {};

  //   // target에 해당하는 글리프만 가져온다.
  //   for (let i = 0; i < targetText.length; i++) {
  //     const char = targetText[i];
  //     const charKey = char in fontData.glyphs ? char : char.toUpperCase();
  //     if (charKey in fontData.glyphs) {
  //       modifiedGlyphs[char] = fontData.glyphs[charKey];
  //     }
  //   }

  //   const modifiedFontData = {
  //     ...fontData,
  //     glyphs: modifiedGlyphs,
  //   };
  //   console.log(modifiedFontData);
  // }, []);
  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 4] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <Physics gravity={[0, -2.6, 0]}>
          <Debug>
            {isStart && <Car />}
            <Ground />
          </Debug>
        </Physics>
        <DrawCall />
        <StatsGl showPanel={0} className="work" />
      </Canvas>
    </>
  );
}

export default Scene;
