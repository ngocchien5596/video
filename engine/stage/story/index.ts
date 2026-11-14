/** Gom vai / đạo cụ / phông của các truyện (cảnh hồi ức) từ từng file tuần. */
import type React from "react";
import type { PropId, RoleId, SceneId } from "../../lib/stage-types.ts";
import type { PropDef } from "../draw.tsx";
import type { Role } from "../face.tsx";
import * as t1 from "./tuan-1.tsx";
import * as t2 from "./tuan-2.tsx";
import * as t3 from "./tuan-3.tsx";
import * as t2b from "./tuan-2b.tsx";
import * as t4 from "./tuan-4.tsx";
import * as t4b from "./tuan-4b.tsx";
import * as cl from "./cho-la.tsx";

const all = [t1, t2, t2b, t3, t4, t4b, cl];
export const STORY_ROLES: Partial<Record<RoleId, Role>> = Object.assign({}, ...all.map((m) => m.roles));
export const STORY_PROPS: Partial<Record<PropId, PropDef>> = Object.assign({}, ...all.map((m) => m.props));
export const STORY_SCENES: Partial<Record<SceneId, React.FC>> = Object.assign({}, ...all.map((m) => m.scenes));
