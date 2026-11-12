/**
 * Remotion Studio chung cho mọi dự án. Mỗi dự án tự khai báo composition của mình
 * trong projects/<dự án>/src/Compositions.tsx; thêm dự án mới thì thêm một dòng ở đây.
 */
import React from "react";
import { Folder, Still } from "remotion";
import { NoiVayCompositions } from "../projects/noi-vay/src/Compositions.tsx";
import { ViSaoCompositions } from "../projects/vi-sao/src/Compositions.tsx";
import { ChannelAvatar, ChannelBanner, ChannelWatermark } from "./ChannelArt.tsx";

export const RemotionRoot: React.FC = () => (
  <>
    <NoiVayCompositions />
    <ViSaoCompositions />
    {/* Ảnh chung của kênh (cả hai series). */}
    <Folder name="Kenh">
      <Still id="Kenh-AnhDaiDien" component={ChannelAvatar} width={800} height={800} />
      <Still id="Kenh-BiaYouTube" component={ChannelBanner} width={2560} height={1440} />
      <Still id="Kenh-HinhMo" component={ChannelWatermark} width={150} height={150} />
    </Folder>
  </>
);
