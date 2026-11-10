/**
 * Remotion Studio chung cho mọi dự án. Mỗi dự án tự khai báo composition của mình
 * trong projects/<dự án>/src/Compositions.tsx; thêm dự án mới thì thêm một dòng ở đây.
 */
import React from "react";
import { NoiVayCompositions } from "../projects/noi-vay/src/Compositions.tsx";
import { ViSaoCompositions } from "../projects/vi-sao/src/Compositions.tsx";

export const RemotionRoot: React.FC = () => (
  <>
    <NoiVayCompositions />
    <ViSaoCompositions />
  </>
);
