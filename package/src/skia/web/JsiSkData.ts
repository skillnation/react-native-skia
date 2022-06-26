import type { CanvasKit } from "canvaskit-wasm";

import type { SkData } from "../types";

import { BaseHostObject } from "./Host";

type Data = ArrayBuffer;

export class JsiSkData extends BaseHostObject<Data, "Data"> implements SkData {
  constructor(CanvasKit: CanvasKit, ref: Data) {
    super(CanvasKit, ref, "Data");
  }
}
