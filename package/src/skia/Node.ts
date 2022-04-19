import type { AnimatedProps, CircleProps, FillProps } from "../renderer";

import type { SkJSIInstance } from "./JsiInstance";

interface Node<T extends string = string> extends SkJSIInstance<T> {
  appendChild(node: Node): void;
}

export interface NodeFactory {
  // eslint-disable-next-line @typescript-eslint/ban-types
  MakeCanvas(props: {}): Node<"CanvasNode">;
  MakeCircle(props: AnimatedProps<CircleProps>): Node<"CircleNode">;
  MakeFill(props: AnimatedProps<FillProps>): Node<"FillNode">;
}