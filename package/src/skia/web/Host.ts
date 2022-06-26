/* eslint-disable no-nested-ternary */
import type { CanvasKit, EmbindEnumEntity, EmbindObject } from "canvaskit-wasm";

import type { SkJSIInstance } from "../types";

export class NotImplementedOnRNWeb extends Error {
  constructor() {
    super("Not implemented on React Native Web");
  }
}

export abstract class Host {
  readonly CanvasKit: CanvasKit;

  constructor(CanvasKit: CanvasKit) {
    this.CanvasKit = CanvasKit;
  }
}

export abstract class BaseHostObject<T, N extends string>
  extends Host
  implements SkJSIInstance<N>
{
  readonly __typename__: N;
  readonly ref: T;

  constructor(CanvasKit: CanvasKit, ref: T, typename: N) {
    super(CanvasKit);
    this.ref = ref;
    this.__typename__ = typename;
  }
}

export abstract class HostObject<
  T extends EmbindObject<T>,
  N extends string
> extends BaseHostObject<T, N> {
  constructor(CanvasKit: CanvasKit, ref: T, typename: N) {
    super(CanvasKit, ref, typename);
  }

  delete() {
    this.ref.delete();
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullish = {};

export const toOptionalValue = <T>(
  value: NonNullish | undefined | null
): T | undefined | null =>
  value === undefined ? undefined : value === null ? null : toValue(value);

export const toUndefinedableValue = <T>(
  value: NonNullish | undefined
): T | undefined => (value === undefined ? undefined : toValue(value));

export const toNullableValue = <T>(value: NonNullish | null): T | null =>
  value === null ? null : toValue(value);

export const toValue = <T>(value: NonNullish): T =>
  (value as BaseHostObject<T, string>).ref;

export const ckEnum = (value: number): EmbindEnumEntity => ({ value });
export const optEnum = (
  value: number | undefined
): EmbindEnumEntity | undefined =>
  value === undefined ? undefined : { value };
